import { userModel } from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import config from "../config/config.js";

const registrationOptions = {
  roles: ["devotee", "pandit"],
  cities: [
    { value: "pune", label: "Pune" },
    { value: "mumbai", label: "Mumbai" },
    { value: "nashik", label: "Nashik" },
    { value: "nagpur", label: "Nagpur" },
    { value: "sambhajinagar", label: "Chhatrapati Sambhajinagar" },
    { value: "kolhapur", label: "Kolhapur" },
    { value: "satara", label: "Satara" },
    { value: "other", label: "Other" },
  ],
  vedicShakhas: [
    { value: "rigveda", label: "Rigveda (ऋग्वेद)" },
    { value: "yajurveda", label: "Yajurveda (शुक्ल / कृष्ण यजुर्वेद)" },
    { value: "samaveda", label: "Samaveda (सामवेद)" },
    { value: "atharvaveda", label: "Atharvaveda (अथर्ववेद)" },
  ],
};

const fieldError = (path, message) => ({ path, message });

const toPublicUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  city: user.city,
  mobileNumber: user.mobileNumber,
  whatsappUpdates: user.whatsappUpdates,
  acceptedTermsAt: user.acceptedTermsAt,
  vedicShakha: user.vedicShakha,
  experience: user.experience,
  panditApplicationStatus: user.panditApplicationStatus,
  createdAt: user.createdAt,
});

const setRefreshCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const clearRefreshCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "lax",
  });
};

const createSession = async (user) => {
  const { accessToken, refreshToken } = generateToken({ userId: user._id });
  user.refresh_token = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};

export const getRegistrationOptionsController = (req, res) => {
  res.status(200).json({ data: registrationOptions });
};

export const updateProfileController = async (req, res) => {
  const { fullName, mobileNumber, city, whatsappUpdates, vedicShakha, experience } =
    req.body || {};
  const normalizedMobileNumber =
    typeof mobileNumber === "string" ? mobileNumber.replace(/\s/g, "") : "";
  const errors = [];

  if (typeof fullName !== "string" || fullName.trim().length < 3 || fullName.trim().length > 255) {
    errors.push(fieldError("fullName", "Full name must be between 3 and 255 characters."));
  }
  if (!/^[6-9]\d{9}$/.test(normalizedMobileNumber)) {
    errors.push(fieldError("mobileNumber", "Enter a valid 10-digit Indian mobile number."));
  }
  if (!registrationOptions.cities.some((item) => item.value === city)) {
    errors.push(fieldError("city", "Select a valid city."));
  }
  if (typeof whatsappUpdates !== "boolean") {
    errors.push(fieldError("whatsappUpdates", "Choose whether to receive WhatsApp updates."));
  }
  if (
    req.user.role === "pandit" &&
    !registrationOptions.vedicShakhas.some((item) => item.value === vedicShakha)
  ) {
    errors.push(fieldError("vedicShakha", "Select your Vedic Shakha."));
  }
  if (
    req.user.role === "pandit" &&
    (typeof experience !== "string" || experience.trim().length > 100)
  ) {
    errors.push(fieldError("experience", "Experience must be 100 characters or fewer."));
  }

  if (errors.length) {
    return res.status(422).json({
      message: "Please correct the highlighted profile details.",
      errors,
    });
  }

  try {
    req.user.fullName = fullName.trim();
    req.user.mobileNumber = normalizedMobileNumber;
    req.user.city = city;
    req.user.whatsappUpdates = whatsappUpdates;
    if (req.user.role === "pandit") {
      req.user.vedicShakha = vedicShakha;
      req.user.experience = experience.trim();
    }
    await req.user.save();

    return res.status(200).json({
      message: "Your profile has been updated.",
      data: { user: toPublicUser(req.user) },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Unable to update your profile. Please try again.",
    });
  }
};

export const registerController = async (req, res) => {
  const {
    fullName,
    email,
    password,
    role,
    city,
    terms,
    vedicShakha,
    whatsappUpdates,
    experience,
    mobileNumber,
  } = req.body;

  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedMobileNumber = mobileNumber?.replace(/\s/g, "");
  const errors = [];

  if (!fullName?.trim() || fullName.trim().length < 3) errors.push(fieldError("fullName", "Full name must be at least 3 characters."));
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) errors.push(fieldError("email", "Enter a valid email address."));
  if (!password || password.length < 8) errors.push(fieldError("password", "Password must be at least 8 characters."));
  if (!normalizedMobileNumber || !/^[6-9]\d{9}$/.test(normalizedMobileNumber)) errors.push(fieldError("mobileNumber", "Enter a valid 10-digit Indian mobile number."));
  if (!registrationOptions.cities.some((item) => item.value === city)) errors.push(fieldError("city", "Select a valid city."));
  if (!registrationOptions.roles.includes(role)) errors.push(fieldError("role", "Select a valid account type."));
  if (terms !== true) errors.push(fieldError("terms", "You must accept the Terms and Privacy Policy."));
  if (role === "pandit" && !registrationOptions.vedicShakhas.some((item) => item.value === vedicShakha)) errors.push(fieldError("vedicShakha", "Select your Vedic Shakha."));

  if (errors.length) return res.status(422).json({ message: "Please correct the highlighted fields.", errors });

  try {
    const isUserExists = await userModel.findOne({ email: normalizedEmail });
    if (isUserExists) {
      return res.status(409).json({ message: "An account with this email already exists.", errors: [fieldError("email", "An account with this email already exists.")] });
    }

    const user = await userModel.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 12),
      role,
      city,
      acceptedTermsAt: new Date(),
      whatsappUpdates: Boolean(whatsappUpdates),
      vedicShakha: role === "pandit" ? vedicShakha : undefined,
      experience: role === "pandit" ? experience?.trim() : undefined,
      mobileNumber: normalizedMobileNumber,
      panditApplicationStatus: role === "pandit" ? "pending_review" : "not_applicable",
    });

    const { accessToken, refreshToken } = await createSession(user);
    setRefreshCookie(res, refreshToken);

    return res.status(201).json({
      message: role === "pandit" ? "Pandit application submitted for review." : "Account created successfully.",
      data: { user: toPublicUser(user), accessToken },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists.", errors: [fieldError("email", "An account with this email already exists.")] });
    }
    return res.status(500).json({ message: "Unable to create your account. Please try again." });
  }
};

export const loginController = async (req, res) => {
  const normalizedEmail = req.body.email?.trim().toLowerCase();
  const { password } = req.body;

  if (!normalizedEmail || !password) {
    return res.status(422).json({
      message: "Email and password are required.",
      errors: [
        ...(!normalizedEmail ? [fieldError("email", "Email is required.")] : []),
        ...(!password ? [fieldError("password", "Password is required.")] : []),
      ],
    });
  }

  try {
    const user = await userModel.findOne({ email: normalizedEmail });
    const isPasswordValid = user && await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const { accessToken, refreshToken } = await createSession(user);
    setRefreshCookie(res, refreshToken);

    return res.status(200).json({
      message: "Welcome back to Aaple Guruji!",
      data: { user: toPublicUser(user), accessToken },
    });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ message: "Unable to sign you in. Please try again." });
  }
};

export const refreshSessionController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No active session found." });

  try {
    const { id } = jwt.verify(refreshToken, config.REFRESH_TOKEN);
    const user = await userModel.findById(id);
    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({ message: "Your session has expired. Please sign in again." });
    }

    const session = await createSession(user);
    setRefreshCookie(res, session.refreshToken);
    return res.status(200).json({
      data: { user: toPublicUser(user), accessToken: session.accessToken },
    });
  } catch {
    return res.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
};

export const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (refreshToken) {
      const { id } = jwt.verify(refreshToken, config.REFRESH_TOKEN);
      await userModel.findByIdAndUpdate(id, { $unset: { refresh_token: 1 } });
    }
  } catch {
    // The browser cookie is still cleared even if it is invalid or expired.
  }

  clearRefreshCookie(res);
  return res.status(200).json({ message: "You have been logged out successfully." });
};

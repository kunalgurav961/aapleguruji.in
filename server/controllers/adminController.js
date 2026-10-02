import Booking from "../models/bookingModel.js";
import Pooja from "../models/poojaModel.js";
import { userModel } from "../models/userModel.js";

const publicUserFields =
  "_id fullName email mobileNumber city role panditApplicationStatus createdAt";

export const getAdminBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("userId", "fullName email mobileNumber")
      .populate("poojaId", "name basePrice");

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Get admin bookings error:", error);
    return res.status(500).json({ message: "Unable to load bookings." });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({}, publicUserFields)
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Get admin users error:", error);
    return res.status(500).json({ message: "Unable to load users." });
  }
};

export const createPooja = async (req, res) => {
  const name = req.body.name?.trim();
  const description = req.body.description?.trim() || "";
  const basePrice = Number(req.body.basePrice);
  const duration = req.body.duration === "" || req.body.duration == null
    ? undefined
    : Number(req.body.duration);

  if (!name || name.length < 3 || name.length > 120) {
    return res.status(422).json({
      message: "Puja name must be between 3 and 120 characters.",
    });
  }
  if (!Number.isFinite(basePrice) || basePrice < 0) {
    return res.status(422).json({
      message: "Enter a valid, non-negative base price.",
    });
  }
  if (description.length > 2000) {
    return res.status(422).json({
      message: "Description must be 2000 characters or fewer.",
    });
  }
  if (
    duration !== undefined &&
    (!Number.isInteger(duration) || duration < 1 || duration > 1440)
  ) {
    return res.status(422).json({
      message: "Duration must be a whole number of minutes from 1 to 1440.",
    });
  }

  const slug =
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || `puja-${Date.now()}`;

  try {
    const existingPooja = await Pooja.findOne({
      $or: [{ slug }, { name: { $regex: `^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } }],
    }).select("_id");

    if (existingPooja) {
      return res.status(409).json({
        message: "A puja with this name already exists.",
      });
    }

    const pooja = await Pooja.create({
      name,
      slug,
      basePrice,
      description,
      shortDescription: description.slice(0, 240),
      ...(duration === undefined ? {} : { duration }),
      isActive: true,
    });

    return res.status(201).json({
      message: "Puja added successfully.",
      pooja: {
        _id: pooja._id,
        name: pooja.name,
        slug: pooja.slug,
        basePrice: pooja.basePrice,
        description: pooja.description,
        duration: pooja.duration,
        isActive: pooja.isActive,
      },
    });
  } catch (error) {
    console.error("Create admin puja error:", error);
    return res.status(500).json({ message: "Unable to add puja." });
  }
};

import Booking from "../models/bookingModel.js";
import Pooja from "../models/poojaModel.js";
import Review from "../models/reviewModel.js";
import { userModel } from "../models/userModel.js";
import mongoose from "mongoose";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const poojaUploadDirectory = new URL("../uploads/pujas/", import.meta.url);
const uploadDirectoryPath = fileURLToPath(poojaUploadDirectory);
const imageExtensions = {
  "image/jpeg": { extension: "jpg", signature: (buffer) => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff },
  "image/png": { extension: "png", signature: (buffer) => buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) },
  "image/webp": { extension: "webp", signature: (buffer) => buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP" },
};

const publicUserFields =
  "_id fullName email mobileNumber city role panditApplicationStatus vedicShakha experience createdAt";

const dashboardPeriods = {
  day: 1,
  week: 7,
  month: 30,
  quarter: 90,
};

export const getAdminDashboard = async (req, res) => {
  const period = req.query.period || "month";
  const days = dashboardPeriods[period];
  if (!days) {
    return res.status(400).json({
      message: "Period must be day, week, month, or quarter.",
    });
  }

  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);
  const periodFilter = { createdAt: { $gte: from, $lt: to } };

  try {
    const [
      allBookings,
      periodBookings,
      bookingValueResult,
      devotees,
      verifiedPandits,
      pendingPanditCount,
      pendingBookings,
      activePujas,
      reviewStats,
      trend,
      statusBreakdown,
      recentBookings,
      pendingPandits,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments(periodFilter),
      Booking.aggregate([
        {
          $match: {
            ...periodFilter,
            bookingStatus: { $ne: "cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            amount: { $sum: { $ifNull: ["$paymentSnapshot.amount", 0] } },
          },
        },
      ]),
      userModel.countDocuments({ role: "devotee" }),
      userModel.countDocuments({
        role: "pandit",
        panditApplicationStatus: "approved",
      }),
      userModel.countDocuments({
        role: "pandit",
        panditApplicationStatus: "pending_review",
      }),
      Booking.countDocuments({ bookingStatus: "pending" }),
      Pooja.countDocuments({ isActive: true }),
      Review.aggregate([
        { $match: { isPublished: true } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            averageRating: { $avg: "$rating" },
          },
        },
      ]),
      Booking.aggregate([
        { $match: periodFilter },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: "UTC",
              },
            },
            bookings: { $sum: 1 },
            amount: {
              $sum: {
                $cond: [
                  { $ne: ["$bookingStatus", "cancelled"] },
                  { $ifNull: ["$paymentSnapshot.amount", 0] },
                  0,
                ],
              },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Booking.aggregate([
        { $match: periodFilter },
        { $group: { _id: "$bookingStatus", count: { $sum: 1 } } },
      ]),
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(8)
        .populate("userId", "fullName email mobileNumber city")
        .populate("poojaId", "name basePrice")
        .lean(),
      userModel
        .find(
          { role: "pandit", panditApplicationStatus: "pending_review" },
          publicUserFields,
        )
        .sort({ createdAt: 1 })
        .limit(6)
        .lean(),
    ]);

    return res.status(200).json({
      period,
      generatedAt: to,
      range: { from, to },
      metrics: {
        totalBookings: allBookings,
        periodBookings,
        bookedDakshina: bookingValueResult[0]?.amount || 0,
        devotees,
        verifiedPandits,
        pendingPanditApplications: pendingPanditCount,
        pendingBookings,
        activePujas,
        publishedReviews: reviewStats[0]?.count || 0,
        averageRating: reviewStats[0]?.averageRating || 0,
      },
      trend: trend.map(({ _id, bookings, amount }) => ({
        date: _id,
        bookings,
        bookedDakshina: amount,
      })),
      statusBreakdown: statusBreakdown.reduce(
        (result, item) => ({ ...result, [item._id]: item.count }),
        { pending: 0, confirmed: 0, cancelled: 0 },
      ),
      recentBookings,
      pendingPandits,
    });
  } catch (error) {
    console.error("Get admin dashboard error:", error);
    return res.status(500).json({ message: "Unable to load dashboard data." });
  }
};

export const updateAdminBookingStatus = async (req, res) => {
  const { bookingStatus } = req.body;
  if (!["confirmed", "cancelled"].includes(bookingStatus)) {
    return res.status(422).json({
      message: "Booking status must be confirmed or cancelled.",
    });
  }
  if (!mongoose.isValidObjectId(req.params.bookingId)) {
    return res.status(404).json({ message: "Booking not found." });
  }

  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.bookingId, bookingStatus: "pending" },
      { bookingStatus },
      { new: true, runValidators: true },
    )
      .populate("userId", "fullName email mobileNumber city")
      .populate("poojaId", "name basePrice");

    if (!booking) {
      return res.status(409).json({
        message: "Booking is no longer pending or could not be found.",
      });
    }
    return res.status(200).json({
      message: "Booking status updated.",
      booking,
    });
  } catch (error) {
    console.error("Update admin booking status error:", error);
    return res.status(500).json({ message: "Unable to update booking status." });
  }
};

export const getAdminPandits = async (req, res) => {
  try {
    const pandits = await userModel
      .find({ role: "pandit", panditApplicationStatus: "pending_review" }, publicUserFields)
      .sort({ createdAt: 1 })
      .limit(100)
      .lean();
    return res.status(200).json({ pandits });
  } catch (error) {
    console.error("Get admin pandits error:", error);
    return res.status(500).json({ message: "Unable to load pandit applications." });
  }
};

export const searchAdminRecords = async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (query.length < 2 || query.length > 80) {
    return res.status(422).json({
      message: "Search text must be between 2 and 80 characters.",
    });
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp(escapedQuery, "i");

  try {
    const [users, bookings, poojas] = await Promise.all([
      userModel
        .find(
          {
            role: { $in: ["devotee", "pandit"] },
            $or: [
              { fullName: expression },
              { email: expression },
              { mobileNumber: expression },
            ],
          },
          "_id fullName email mobileNumber role",
        )
        .limit(5)
        .lean(),
      Booking.find({
        $or: [
          { bookingNumber: expression },
          { bookingId: expression },
          { "customerSnapshot.fullName": expression },
          { "customerSnapshot.mobileNumber": expression },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "fullName mobileNumber")
        .populate("poojaId", "name")
        .lean(),
      Pooja.find({ name: expression }, "_id name isActive")
        .sort({ name: 1 })
        .limit(5)
        .lean(),
    ]);

    const results = [
      ...users.map((user) => ({
        id: user._id,
        type: user.role,
        title: user.fullName,
        detail: user.email,
        href: "/admin/users",
      })),
      ...bookings.map((booking) => ({
        id: booking._id,
        type: "booking",
        title: booking.bookingNumber || booking.bookingId,
        detail: `${booking.customerSnapshot?.fullName || booking.userId?.fullName || "Devotee"} · ${booking.poojaId?.name || "Puja"}`,
        href: "/admin/bookings",
      })),
      ...poojas.map((pooja) => ({
        id: pooja._id,
        type: "puja",
        title: pooja.name,
        detail: pooja.isActive ? "Active puja service" : "Inactive puja service",
        href: "/admin/services",
      })),
    ];
    return res.status(200).json({ results });
  } catch (error) {
    console.error("Search admin records error:", error);
    return res.status(500).json({ message: "Unable to search admin records." });
  }
};

export const updatePanditApplicationStatus = async (req, res) => {
  const { status } = req.body;
  if (!["approved", "rejected"].includes(status)) {
    return res.status(422).json({ message: "Select approved or rejected." });
  }
  if (!mongoose.isValidObjectId(req.params.panditId)) {
    return res.status(404).json({ message: "Pandit application not found." });
  }

  try {
    const pandit = await userModel.findOneAndUpdate(
      {
        _id: req.params.panditId,
        role: "pandit",
        panditApplicationStatus: "pending_review",
      },
      { panditApplicationStatus: status },
      { new: true, runValidators: true, projection: publicUserFields },
    );

    if (!pandit) {
      return res.status(404).json({
        message: "Pending pandit application not found.",
      });
    }
    return res.status(200).json({
      message: `Pandit application ${status}.`,
      pandit,
    });
  } catch (error) {
    console.error("Update pandit application status error:", error);
    return res.status(500).json({
      message: "Unable to update pandit application.",
    });
  }
};

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
  const category = req.body.category?.trim() || "";
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
  const allowedPoojaCategories = [
    "Griha & Vastu",
    "Festivals & Vrat",
    "Havans & Yagnas",
    "Naming & Sanskars",
    "Ancestral (Shraadh)",
  ];
  if (category && !allowedPoojaCategories.includes(category)) {
    return res.status(422).json({ message: "Choose a valid puja category." });
  }
  if (
    duration !== undefined &&
    (!Number.isInteger(duration) || duration < 1 || duration > 1440)
  ) {
    return res.status(422).json({
      message: "Duration must be a whole number of minutes from 1 to 1440.",
    });
  }
  const files = req.files || [];
  if (files.some((file) => !imageExtensions[file.mimetype]?.signature(file.buffer))) {
    return res.status(422).json({
      message: "Each puja image must be a valid JPG, PNG, or WebP file.",
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

    await mkdir(uploadDirectoryPath, { recursive: true });
    const savedFiles = [];
    const imagePaths = [];
    try {
      for (const file of files) {
        const { extension } = imageExtensions[file.mimetype];
        const fileName = `${randomUUID()}.${extension}`;
        const filePath = new URL(fileName, poojaUploadDirectory);
        await writeFile(filePath, file.buffer, { flag: "wx" });
        savedFiles.push(filePath);
        imagePaths.push(`/api/uploads/pujas/${fileName}`);
      }

      const pooja = await Pooja.create({
      name,
      slug,
      basePrice,
      category,
      description,
      shortDescription: description.slice(0, 240),
      images: imagePaths,
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
          category: pooja.category,
          description: pooja.description,
          duration: pooja.duration,
          images: pooja.images,
          isActive: pooja.isActive,
        },
      });
    } catch (error) {
      await Promise.all(
        savedFiles.map((filePath) =>
          unlink(filePath).catch((cleanupError) => {
            console.error("Remove incomplete puja image error:", cleanupError);
          }),
        ),
      );
      throw error;
    }
  } catch (error) {
    console.error("Create admin puja error:", error);
    return res.status(500).json({ message: "Unable to add puja." });
  }
};

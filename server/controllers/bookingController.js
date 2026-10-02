import { userModel } from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import Pooja from "../models/poojaModel.js";
import { randomUUID } from "node:crypto";

const parseBookingDate = (value) => {
  if (typeof value !== "string") return null;

  const match = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      return null;
    }

    return date;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const getPoojas = async (req, res) => {
  try {
    const poojas = await Pooja.find(
      { isActive: true },
      { name: 1, basePrice: 1 },
    ).sort({ name: 1 });

    return res.status(200).json({ poojas });
  } catch (error) {
    console.error("Get poojas error:", error);

    return res.status(500).json({
      message: "Failed to retrieve poojas",
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      poojaId,
      bookingDate,
      bookingTime,
      paymentMethod,
      paymentAmount,
      address,
      gmapLocation,
    } = req.body;
    const parsedBookingDate = parseBookingDate(bookingDate);

    if (!parsedBookingDate) {
      return res.status(400).json({
        message: "Invalid booking date. Use DD-MM-YYYY.",
      });
    }

    // Find user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const pooja = await Pooja.findOne({ _id: poojaId, isActive: true });

    if (!pooja) {
      return res.status(404).json({
        message: "Pooja not found",
      });
    }

    const { fullName, mobileNumber } = user;
    const bookingId = randomUUID();

    const booking = await Booking.create({
      bookingId,
      bookingNumber: `AG-${bookingId}`,
      userId,
      poojaId,

      bookingDate: parsedBookingDate,
      bookingTime,

      address,
      gmapLocation,

      customerSnapshot: {
        fullName,
        mobileNumber,
      },

      poojaSnapshot: {
        poojaId,
      },

      paymentSnapshot: {
        method: paymentMethod,
        amount: pooja.basePrice,
        status: "pending",
      },

      bookingStatus: "pending",
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

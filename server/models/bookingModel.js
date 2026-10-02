import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
    },
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    poojaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pooja",
      required: true,
    },

    address: {
      type: Object,
      required: false,
    },

    gmapLocation: {
      type: String,
      required: false,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    bookingTime: {
      type: String,
      required: true,
    },

    customerSnapshot: {
      type: Object,
      required: true,
    },

    poojaSnapshot: {
      type: Object,
      required: true,
    },

    paymentSnapshot: {
      type: Object,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    remarks: {
      type: [String ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

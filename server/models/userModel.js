import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  refresh_token: {
    type: String,
  },

  role: {
    type: String,
    enum: ["devotee", "pandit", "admin"],
    required: true,
    default: "devotee",
  },

  mobileNumber: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/,
  },

  city: {
    type: String,
    required: true,
    trim: true,
  },

  whatsappUpdates: {
    type: Boolean,
    default: true,
  },

  acceptedTermsAt: {
    type: Date,
    required: true,
  },

  vedicShakha: {
    type: String,
    enum: ["rigveda", "yajurveda", "samaveda", "atharvaveda"],
  },

  experience: {
    type: String,
    trim: true,
    maxlength: 100,
  },

  panditApplicationStatus: {
    type: String,
    enum: ["not_applicable", "pending_review", "approved", "rejected"],
    default: "not_applicable",
  },
}, { timestamps: true });

export const userModel = mongoose.model("User", userSchema);

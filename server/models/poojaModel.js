import mongoose from "mongoose";

const poojaSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    description: String,
    duration: Number,
    images: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    languages: [String],
    locationType: String,
    requirements: [String],
    shortDescription: String,
  },
  {
    timestamps: true,
    collection: "pujas",
  },
);

const Pooja = mongoose.model("Pooja", poojaSchema);

export default Pooja;

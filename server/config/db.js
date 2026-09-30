import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("connected to aaple guruji");
  } catch (error) {
    console.error("Unable to connect to MongoDB:", error.message);
    throw error;
  }
};

import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { userModel } from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");

  if (!token) return res.status(401).json({ message: "Authentication is required." });

  try {
    const { id } = jwt.verify(token, config.ACCESS_TOKEN);
    const user = await userModel.findById(id).select("-passwordHash -refresh_token");
    if (!user) return res.status(401).json({ message: "Authentication is required." });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
};

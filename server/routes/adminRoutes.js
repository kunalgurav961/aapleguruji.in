import express from "express";
import {
  createPooja,
  getAdminBookings,
  getAdminUsers,
} from "../controllers/adminController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.use(requireAuth, requireAdmin);
adminRouter.get("/bookings", getAdminBookings);
adminRouter.get("/users", getAdminUsers);
adminRouter.post("/poojas", createPooja);

export default adminRouter;

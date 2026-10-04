import express from "express";
import {
  createPooja,
  getAdminDashboard,
  getAdminBookings,
  getAdminPandits,
  getAdminUsers,
  searchAdminRecords,
  updateAdminBookingStatus,
  updatePanditApplicationStatus,
} from "../controllers/adminController.js";
import {
  createAdminReview,
  getAdminReviews,
} from "../controllers/reviewController.js";
import {
  createAdminBlog,
  getAdminBlogs,
  updateAdminBlogStatus,
} from "../controllers/blogController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import handlePoojaImageUpload from "../middleware/poojaImageUpload.js";
import handleBlogUpload from "../middleware/blogUpload.js";

const adminRouter = express.Router();

adminRouter.use(requireAuth, requireAdmin);
adminRouter.get("/dashboard", getAdminDashboard);
adminRouter.get("/bookings", getAdminBookings);
adminRouter.patch("/bookings/:bookingId/status", updateAdminBookingStatus);
adminRouter.get("/users", getAdminUsers);
adminRouter.get("/pandits", getAdminPandits);
adminRouter.patch("/pandits/:panditId/status", updatePanditApplicationStatus);
adminRouter.get("/search", searchAdminRecords);
adminRouter.post("/poojas", handlePoojaImageUpload, createPooja);
adminRouter.get("/reviews", getAdminReviews);
adminRouter.post("/reviews", createAdminReview);
adminRouter.get("/blogs", getAdminBlogs);
adminRouter.post("/blogs", handleBlogUpload, createAdminBlog);
adminRouter.patch("/blogs/:blogId/status", updateAdminBlogStatus);

export default adminRouter;

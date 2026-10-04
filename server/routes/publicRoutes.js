import express from "express";
import { getPublicReviews } from "../controllers/reviewController.js";
import { getPublicBlogs } from "../controllers/blogController.js";

const publicRouter = express.Router();

publicRouter.get("/reviews", getPublicReviews);
publicRouter.get("/blogs", getPublicBlogs);

export default publicRouter;

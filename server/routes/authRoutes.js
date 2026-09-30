import express from "express";
import { getRegistrationOptionsController, loginController, logoutController, refreshSessionController, registerController } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/register/options", getRegistrationOptionsController);
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshSessionController);
router.post("/logout", logoutController);
router.get("/me", requireAuth, (req, res) => res.status(200).json({ data: { user: req.user } }));

export default router;

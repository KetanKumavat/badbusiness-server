import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  getUserProfile,
} from "../controller/userController.js";
import { eventsAttendedByUser } from "../controller/eventController.js";
import isUser from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh", isUser, refreshToken);

router.post("/forgotpassword", forgotPassword);

router.post("/resetpassword", resetPassword);

router.get("/profile", isUser, getUserProfile);

router.get("/:userId/events-attended", isUser, eventsAttendedByUser);

export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
} from "../controller/userController.js";
import isUser from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh", isUser, refreshToken);

router.post("/forgotpassword", forgotPassword);

router.post("/resetpassword", resetPassword);
export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
} from "../controller/userController.js";
import isUser from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh", isUser, refreshToken);

export default router;

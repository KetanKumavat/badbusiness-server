import express from "express";
import {
  submitForm,
  getFormById,
  getForms,
} from "../controller/formController.js";
import isUser from "./../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/submit", isUser, submitForm);
router.get("/all", isUser, isAdmin, getForms);
router.get("/:id", isUser, isAdmin, getFormById);

export default router;

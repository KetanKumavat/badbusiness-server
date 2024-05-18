import express from "express";
import {
  getHoF,
  getHofById,
  createHoF,
  updateHoF,
  deleteHoF,
} from "../controller/HoFController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getHoF);
router.get("/:id", getHofById);
router.post("/create", isUser, isAdmin, createHoF);
router.put("/update/:id", isUser, isAdmin, updateHoF);
router.delete("/delete/:id", isUser, isAdmin, deleteHoF);

export default router;

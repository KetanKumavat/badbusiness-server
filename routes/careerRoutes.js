import express from "express";
import {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} from "../controller/careerController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/", isUser, getCareers);
router.post("/create", isUser, isAdmin, createCareer);
router.get("/:id", isUser, getCareerById);
router.put("/update/:id", isUser, isAdmin, updateCareer);
router.delete("/delete/:id", isUser, isAdmin, deleteCareer);

export default router;

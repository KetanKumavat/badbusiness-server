import express from "express";
import {
  getCareers,
  getCareerById,
  getCareerByCategory,
  createCareer,
  updateCareer,
  deleteCareer,
  applyCareer,
} from "../controller/careerController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/", getCareers);
router.get("/:id", getCareerById);
router.get("/category/:category", getCareerByCategory);
router.post("/create", isUser, isAdmin, createCareer);
router.put("/update/:id", isUser, isAdmin, updateCareer);
router.delete("/delete/:id", isUser, isAdmin, deleteCareer);
router.put("/apply/:id", applyCareer);

export default router;

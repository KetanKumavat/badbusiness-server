import express from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controller/serviceController.js";
import validateToken from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/create", validateToken, isAdmin, createService);
router.put("/:id/update", validateToken, isAdmin, updateService);
router.delete("/:id/delete", validateToken, isAdmin, deleteService);

export default router;

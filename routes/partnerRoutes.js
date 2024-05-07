import express from "express";
import {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
} from "../controller/partnerController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getPartners);
router.get("/:id", getPartnerById);
router.post("/create", isUser, isAdmin, createPartner);
router.put("/update/:id", isUser, isAdmin, updatePartner);
router.delete("/delete/:id", isUser, isAdmin, deletePartner);

export default router;

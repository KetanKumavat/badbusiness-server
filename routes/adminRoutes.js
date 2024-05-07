import express from "express";
import { addAdmin } from "../controller/adminController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/add", isUser, isAdmin, addAdmin);

export default router;

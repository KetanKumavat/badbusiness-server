import express from "express";
import { addAdmin } from "../controller/adminController.js";
import validateToken from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/add", validateToken, isAdmin, addAdmin);

export default router;
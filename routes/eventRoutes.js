import express from "express";
import {
  getAllEvents,
  getEventBySlug,
  createEvent,
} from "../controller/eventController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:slug", getEventBySlug);
router.post("/create", validateToken, createEvent);

export default router;
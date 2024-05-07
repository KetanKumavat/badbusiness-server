import express from "express";
import {
  getAllEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
  setStatus,
} from "../controller/eventController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:slug", getEventBySlug);
router.post("/create", isUser, createEvent);
router.put("/:eventId/update", isUser, updateEvent);
router.delete("/:eventId/delete", isUser, deleteEvent);
router.put("/:eventSlug/status", isUser, isAdmin, setStatus);

export default router;

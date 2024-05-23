import express from "express";
import {
  getAllEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
  setStatus,
  registerForEvent,
  getFilteredEvents,
} from "../controller/eventController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getFilteredEvents);
router.get("/all", getAllEvents);
router.get("/:slug", getEventBySlug);
router.post("/create", isUser, createEvent);
router.put("/update/:eventId", isUser, updateEvent);
router.delete("/delete/:eventId", isUser, deleteEvent);
router.put("/status/:eventSlug", isUser, isAdmin, setStatus);
router.put("/register/:eventSlug", registerForEvent);

export default router;

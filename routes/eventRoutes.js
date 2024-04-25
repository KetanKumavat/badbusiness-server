import express from "express";
import {
  getAllEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controller/eventController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:slug", getEventBySlug);
router.post("/create", validateToken, createEvent);
router.put("/:eventId/update", validateToken, updateEvent);
router.delete("/:eventId/delete", validateToken, deleteEvent);


export default router;
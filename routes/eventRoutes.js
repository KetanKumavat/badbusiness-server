import express from "express";
import {
  getAllEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
  setStatus,
} from "../controller/eventController.js";
import validateToken from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:slug", getEventBySlug);
router.post("/create", validateToken, createEvent);
router.put("/:eventId/update", validateToken, updateEvent);
router.delete("/:eventId/delete", validateToken, deleteEvent);
router.put("/:eventSlug/status",validateToken,isAdmin,setStatus);


export default router;
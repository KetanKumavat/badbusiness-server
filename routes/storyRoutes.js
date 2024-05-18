import express from "express";
import {
  getStories,
  createStory,
  deleteStory,
  getStoryById,
  updateStory,
} from "../controller/storyController.js";
import isUser from "../middleware/validateTokenHandler.js";
import isAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStoryById);
router.post("/create", isUser, isAdmin, createStory);
router.delete("/delete/:id", isUser, isAdmin, deleteStory);
router.put("/update/:id", isUser, isAdmin, updateStory);

export default router;

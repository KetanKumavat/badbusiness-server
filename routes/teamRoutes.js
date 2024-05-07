import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
} from "../controller/teamController.js";
import express from "express";
import isUser from "./../middleware/validateTokenHandler.js";
import isAdmin from "./../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.post("/create", isUser, isAdmin, createTeam);
router.put("/update/:id", isUser, isAdmin, updateTeam);
router.delete("/delete/:id", isUser, isAdmin, deleteTeam);

export default router;

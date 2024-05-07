import mongoose from "mongoose";
import Team from "../models/teamModel.js";

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ success: true, teams });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findById(id);
    res.status(200).json({ success: true, team });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const createTeam = async (req, res) => {
  const { name, headline, photo, links, isMVP } = req.body;
  const newTeam = new Team({
    name,
    headline,
    photo,
    links,
    isMVP,
  });
  try {
    await newTeam.save();
    res
      .status(201)
      .json({ success: true, message: "Team Created successfully", newTeam });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, headline, photo, links, isMVP } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ success: false, message: `No team with id: ${id}` });

    const updatedTeam = { name, headline, photo, links, isMVP };
    await Team.findByIdAndUpdate(id, updatedTeam, {
      new: true,
      runValidators: true,
    });
    res.json({
      success: true,
      message: "Team updated successfully.",
      updatedTeam,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ success: false, message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ success: false, message: `No team with id: ${id}` });
    await Team.findByIdAndDelete(id);
    res.json({ success: true, message: "Team deleted successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ success: false, message: error.message });
  }
};

export { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam };

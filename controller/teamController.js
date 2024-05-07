import mongoose from "mongoose";
import Team from "../models/teamModel.js";

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOne({ id }).select(
      "_id id name headline photo links isMVP"
    );
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const createTeam = async (req, res) => {
  const { id, name, headline, photo, links, isMVP } = req.body;
  const newTeam = new Team({
    id,
    name,
    headline,
    photo,
    links,
    isMVP,
  });
  try {
    await newTeam.save();
    res.status(201).json({ message: "Team Created successfully", newTeam });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, headline, photo, links, isMVP } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No team with id: ${id}`);

  const updatedTeam = { name, headline, photo, links, isMVP };
  await Team.findByIdAndUpdate(id, updatedTeam, { new: true });
  res.json({ message: "Team updated successfully.", updatedTeam });
};

const deleteTeam = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No team with id: ${id}`);

  await Team.findByIdAndRemove(id);
  res.json({ message: "Team deleted successfully." });
};

export { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam };

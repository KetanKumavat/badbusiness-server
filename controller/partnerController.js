import Partner from "../models/partnerModel.js";
import mongoose from "mongoose";

const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPartnerById = async (req, res) => {
  const { id } = req.params;
  try {
    const partner = await Partner.findById(id);
    res.status(200).json(partner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPartner = async (req, res) => {
  const { id, name, headline, photo, links, isMVP } = req.body;
  const newPartner = new Partner({
    id,
    name,
    headline,
    photo,
    links,
    isMVP,
  });
  try {
    await newPartner.save();
    res
      .status(201)
      .json({ message: "Partner Created successfully", newPartner });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePartner = async (req, res) => {
  const { id } = req.params;
  const { name, headline, photo, links, isMVP } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No partner with id: ${id}`);
    }
    const updatedPartner = { name, headline, photo, links, isMVP };
    await Partner.findByIdAndUpdate(id, updatedPartner, { new: true });
    res.json({ message: "Partner updated successfully.", updatedPartner });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deletePartner = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No partner with id: ${id}`);
    }
    await Partner.findByIdAndDelete(id);
    res.json({ message: "Partner deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
};

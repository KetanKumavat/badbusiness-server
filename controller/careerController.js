import CareerPortal from "../models/careerPortal.js";
import mongoose from "mongoose";

export const getCareers = async (req, res) => {
  try {
    const careers = await CareerPortal.find().select(
      "jobTitle jobLocation jobType category link logo stipend "
    );
    res.status(200).json({ success: true, careers });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getCareerById = async (req, res) => {
  const { id } = req.params;

  try {
    const career = await CareerPortal.findById(id).select(
      "jobTitle jobLocation jobType link logo stipend datePosted applications category"
    );
    res.status(200).json({ success: true, career });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getCareerByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const careers = await CareerPortal.find({
      category: category.toLowerCase(),
    }).select("jobTitle jobLocation jobType link logo stipend category");
    res.status(200).json({ success: true, careers });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const createCareer = async (req, res) => {
  const { jobTitle, jobLocation, jobType, link, category, logo, stipend } =
    req.body;

  const newCareer = new CareerPortal({
    jobTitle,
    jobLocation,
    jobType,
    link,
    category: category.toLowerCase(),
    logo,
    stipend,
  });

  try {
    await newCareer.save();
    res
      .status(201)
      .json({ success: true, message: "Job Created Successfully", newCareer });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

export const updateCareer = async (req, res) => {
  const { id } = req.params;
  const { jobTitle, jobLocation, jobType, category, link, logo, stipend } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No career with id: ${id}`);

  const updatedCareer = {
    jobTitle,
    jobLocation,
    jobType,
    link,
    category,
    logo,
    stipend,
  };

  await CareerPortal.findByIdAndUpdate(id, updatedCareer, { new: true });

  res.json({
    success: true,
    message: "Career updated successfully.",
    updatedCareer,
  });
};

export const deleteCareer = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No career with id: ${id}`);
    await CareerPortal.findByIdAndDelete(id);
    res.json({ success: true, message: "Career deleted successfully." });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const applyCareer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, country, resume, links } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No career with id: ${id}`);

    const career = await CareerPortal.findById(id);

    const appliedCareer = {
      name,
      email,
      phone,
      country,
      resume,
      links,
    };
    career.applications.push(appliedCareer);
    await career.save();
    res.json({
      success: true,
      message: "Applied for the job successfully.",
      appliedCareer,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

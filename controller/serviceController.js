import serviceModel from "../models/serviceModel.js";

export const getAllServices = async (req, res) => {
  try {
    const allServices = await serviceModel.find(
      {},
      {
        id: 1,
        image: 1,
        category: 1,
        title: 1,
        profile: 1,
      }
    );
    res.json(allServices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceModel
      .findOne({ id })
      .select("_id id image category title profile");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createService = async (req, res) => {
  const { id, title, image, category, profile } = req.body;

  if (!id || !title || !image || !category || !profile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const createdService = await serviceModel.create({
      id,
      title,
      image,
      category,
      profile,
    });
    res.json({
      message: "Service Added successfully",
      service: createdService,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, image, category, profile } = req.body;

  try {
    const createdService = await serviceModel.create({
      id,
      title,
      image,
      category,
      profile,
    });
    res.json({
      message: "Service updated successfully",
      service: createdService,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await serviceModel.findOneAndDelete({ id });
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

import Service from "../models/serviceModel.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, services });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

export const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createService = async (req, res) => {
  const { title, image, category, description } = req.body;

  if (!title || !category || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const createdService = await Service.create({
      title,
      image,
      category,
      description,
    });
    res.json({
      success: true,
      message: "Service Added successfully",
      service: createdService,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, image, category, description } = req.body;
  try {
    const updatedService = { title, image, category };
    await Service.findByIdAndUpdate(id, updatedService, { new: true });
    if (!updatedService) {
      return res
        .status(404)
        .json({ success: true, message: "Service not found" });
    }
    res.json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

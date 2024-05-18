import HallOfFame from "../models/HoFModel.js";

export const getHoF = async (req, res) => {
  try {
    const hallOfFame = await HallOfFame.find();
    res.status(200).json({
      success: true,
      hallOfFame,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getHofById = async (req, res) => {
  const { id } = req.params;
  try {
    const hallOfFame = await HallOfFame.findById(id);
    res.status(200).json({ success: true, hallOfFame });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const createHoF = async (req, res) => {
  const { businessName, solution, result } = req.body;
  const newHoF = new HallOfFame({ businessName, solution, result });
  try {
    await newHoF.save();
    res.status(201).json({
      success: true,
      message: "Hall Of Fame Created Successfully",
      hallOfFame: newHoF,
    });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

export const updateHoF = async (req, res) => {
  const { id } = req.params;
  const { businessName, solution, result } = req.body;
  try {
    const updatedHoF = await HallOfFame.findByIdAndUpdate(
      id,
      { businessName, solution, result },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Hall Of Fame Updated Successfully",
      hallOfFame: updatedHoF,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const deleteHoF = async (req, res) => {
  const { id } = req.params;
  try {
    await HallOfFame.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Hall of Fame Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

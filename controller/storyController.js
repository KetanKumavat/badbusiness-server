import Story from "../models/storyModel.js";

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json({ success: false, stories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Cannot Get Stories" });
  }
};

export const getStoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findById(id);
    res.status(200).json({ success: true, story });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Cannot Get Story" });
  }
};

export const createStory = async (req, res) => {
  const { headline, url, type } = req.body;
  const newStory = new Story({ headline, url, type });
  try {
    await newStory.save();
    res.status(201).json({ success: true, story: newStory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Cannot Create Story" });
  }
};

export const updateStory = async (req, res) => {
  const { id } = req.params;
  const { headline, url, type } = req.body;
  try {
    const story = await Story.findByIdAndUpdate(
      id,
      { headline, url, type },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, story });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Cannot Update Story" });
  }
};

export const deleteStory = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Story Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Cannot Delete Story" });
  }
};

import Event from "../models/eventModel.js";

export const getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find(
      {},
      { _id: 0, title: 1, description: 1, time: 1, type: 1 }
    );
    res.json(allEvents);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createEvent = async (req, res) => {
  const newEvent = req.body;
  try {
    const createdEvent = await Event.create(newEvent);
    res
      .status(201)
      .json({ message: "Event added successfully", event: createdEvent });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
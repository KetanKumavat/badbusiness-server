import Event from "../models/eventModel.js";

export const getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find(
      {},
      {
        _id: 1,
        title: 1,
        description: 1,
        date: 1,
        time: 1,
        type: 1,
        listedBy: 1,
        status: 1,
        createdBy: 1,
      }
    ).populate("createdBy", "id username email").select("_id title description date time type listedBy status createdBy");
    res.json(allEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug })
      .populate("createdBy", "id username email")
      .select("_id slug title description date time type listedBy status createdBy");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createEvent = async (req, res) => {
  const { title, description, date, time, type, listedBy, status } = req.body;
  const userId = req.user.id;
  
  if (!title || !description || !date || !time || !type || !listedBy) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const slug = title.toLowerCase().replace(/ /g, "-");
  try {
    const createdEvent = await Event.create({
      slug,
      title,
      description,
      date,
      time,
      type,
      listedBy,
      createdBy: userId,
      status
    });

    const populatedEvent = await Event.findById(createdEvent._id)
      .populate("createdBy", "id username email")
      .select("_id title description date time type listedBy status createdBy");
    res
      .status(201)
      .json({ message: "Event added successfully", event: populatedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { title, description, date, time, type, listedBy, status } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date, time, type, listedBy, status },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(201).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const setStatus = async (req, res) => {
  const { eventSlug } = req.params;
  const { status } = req.body;
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { slug: eventSlug },
      { status },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event status updated successfully", event: updatedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}
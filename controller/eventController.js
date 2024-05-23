import Event from "../models/eventModel.js";

export const getAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find(
      {},
      {
        _id: 1,
        slug: 1,
        title: 1,
        description: 1,
        banner: 1,
        date: 1,
        time: 1,
        type: 1,
        listedBy: 1,
        status: 1,
        createdBy: 1,
      }
    )
      .populate("createdBy", "id username email")
      .select(
        "_id title description banner date time type listedBy status createdBy"
      );
    res.json({ success: true, events: allEvents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug }).populate(
      "createdBy",
      "id username email"
    );
    const attendeesCount = event.attendees.length;
    const eventWithAttendeesCount = {
      ...event._doc,
      attendees: attendeesCount,
    };
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.json({
      success: true,
      event: eventWithAttendeesCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    platform,
    venue,
    type,
    sponsor,
    hosts,
    speakers,
    banner,
    listedBy,
  } = req.body;
  const userId = req.user.id;

  if (!title || !description || !date || !time || !type) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
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
      sponsor,
      hosts,
      speakers,
      banner,
      venue,
      platform,
    });

    const populatedEvent = await Event.findById(createdEvent._id)
      .populate("createdBy", "id username email")
      .select("_id title description date time type listedBy status createdBy");
    res.status(201).json({
      success: true,
      message: "Event added successfully",
      event: populatedEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const {
    title,
    description,
    date,
    time,
    platform,
    venue,
    type,
    sponsor,
    hosts,
    speakers,
    banner,
  } = req.body;

  const userId = req.user.id;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        date,
        time,
        type,
        listedBy: userId,
        createdBy: userId,
        sponsor,
        hosts,
        speakers,
        banner,
        venue,
        platform,
      },
      { new: true }
    );
    if (!updatedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res
      .status(201)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
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
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.json({
      success: true,
      message: "Event status updated successfully",
      event: updatedEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const registerForEvent = async (req, res) => {
  const { eventSlug } = req.params;
  const { attendeeName, email, phone, attendeeType, typeName } = req.body;

  try {
    const event = await Event.findOne({ slug: eventSlug });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const newAttendee = {
      attendeeName,
      email,
      phone,
      attendeeType,
      typeName,
    };

    event.attendees.push(newAttendee);
    await event.save();

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      attendee: newAttendee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

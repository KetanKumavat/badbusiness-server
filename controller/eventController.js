import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const getFilteredEvents = async (req, res) => {
  //sending only events with status accepted
  try {
    const filteredEvents = await Event.find(
      { status: "accepted" },
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
    res.json({ success: true, events: filteredEvents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

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

export const getEventBySlugOrId = async (req, res) => {
  try {
    const { slugOrId } = req.params;
    const query = mongoose.Types.ObjectId.isValid(slugOrId)
      ? { _id: slugOrId }
      : { slug: slugOrId };

    const event = await Event.findOne(query).populate(
      "createdBy",
      "id username email"
    );

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const attendeesCount = event.attendees.length;
    const eventWithAttendeesCount = {
      ...event._doc,
      attendees: attendeesCount,
    };

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
    sponsors,
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
      sponsors,
      hosts,
      speakers,
      banner,
      venue,
      platform,
    });

    const populatedEvent = await Event.findById(createdEvent._id)
      .populate("createdBy", "id username email")
      .select("_id title description date time type listedBy status createdBy sponsors hosts speakers banner venue platform");
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
  // console.log("event id", eventId);
  const {
    title,
    description,
    date,
    time,
    platform,
    venue,
    type,
    listedBy,
    sponsors,
    hosts,
    speakers,
    banner,
  } = req.body;

  const userId = req.user.id;
  let updatedEvent;

  try {
    if (title && title.length > 0) {
      const slug = title.toLowerCase().replace(/ /g, "-");
      updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          title,
          description,
          date,
          time,
          type,
          listedBy,
          createdBy: userId,
          sponsors,
          hosts,
          speakers,
          banner,
          venue,
          platform,
          slug,
        },
        { new: true }
      );
    } else {
      updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          title,
          description,
          date,
          time,
          type,
          listedBy,
          createdBy: userId,
          sponsors,
          hosts,
          speakers,
          banner,
          venue,
          platform,
        },
        { new: true }
      );
    }

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
  // console.log("current date", new Date());
  // console.log(new Date().getHours());
  const { eventSlug } = req.params;
  const { attendeeName, email, phone, attendeeType, typeName } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findOne({ slug: eventSlug });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Event is not open for registration yet",
      });
    }

    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    const eventTime = new Date(
      `${event.date}T${event.time}:00Z`
    ).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    if (new Date(currentTime) >= new Date(eventTime)) {
      return res.status(400).json({
        success: false,
        message:
          "Event has already passed. You cannot register for this event.",
      });
    }

    if (new Date().getDate() >= new Date(eventTime).getDate()) {
      return res.status(400).json({
        success: false,
        message:
          "Event has already started. You cannot register for this event.",
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

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user) {
      user.eventsAttended.push(event._id);
      await user.save();
    }

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

export const eventsAttendedByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: "eventsAttended",
      select: "_id title description date time type listedBy status createdBy",
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json(user.eventsAttended);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

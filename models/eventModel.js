import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: { type: String, required: true },
  platform: { type: String },
  venue: { type: String },
  banner: { type: String },
  attendees: [
    {
      attendeeName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: Number, required: true },
      attendeeType: {
        type: String,
        required: true,
        enum: ["institute", "organization"],
      },
      typeName: { type: String, required: true },
    },
  ],
  listedBy: {
    type: String,
    enum: ["individual", "organization"],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["accepted", "declined", "pending"],
    default: "pending",
  },
  speakers: [
    {
      name: { type: String },
      avatar: { type: String },
      description: { type: String },
      profile: { type: String },
      type: { type: String },
    },
  ],
  hosts: [
    {
      name: { type: String },
      avatar: { type: String },
      description: { type: String },
      profile: { type: String },
      type: { type: String },
    },
  ],
  sponsors: [
    {
      name: { type: String },
      avatar: { type: String },
      description: { type: String },
      profile: { type: String },
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;

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
  attendees: { type: Number },
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
    enum: ["accepted", "declined", "still processing"],
    default: "still processing",
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

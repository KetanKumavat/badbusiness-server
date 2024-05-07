import mongoose from "mongoose";

const team = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    headline: {
      type: String,
    },
    photo: {
      type: String,
    },
    links: [
      {
        name: { type: String },
        url: { type: String },
        icon: { type: String },
        type: { type: String },
      },
    ],
    isMVP: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", team);
export default Team;

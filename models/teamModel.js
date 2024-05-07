import mongoose from "mongoose";

const team = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    headline: {
      type: String,
    },
    domain: {
      type: String,
    },
    photo: {
      type: String,
    },
    links: [
      {
        name: { type: String },
        url: { type: String },
        icon: {
          type: String,
          enum: [
            "facebook",
            "twitter",
            "linkedin",
            "instagram",
            "github",
            "behance",
            "dribble",
            "others",
          ],
        },
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

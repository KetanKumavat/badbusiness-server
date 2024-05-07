import mongoose from "mongoose";

const partner = new mongoose.Schema(
  {
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

const Partner = mongoose.model("Partner", partner);
export default Partner;

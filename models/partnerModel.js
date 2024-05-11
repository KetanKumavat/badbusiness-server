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
        icon: {
          type: String,
          enum: [
            "facebook",
            "twitter",
            "linkedin",
            "instagram",
            "github",
            "behance",
            "dribbble",
            "others",
          ],
          required: true,
        },
        type: {
          type: String,
          enum: ["internal", "external"],
          default: "external",
          required: true,
        },
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

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
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
            "dribbble",
            "others",
          ],
          required: true,
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

// teamSchema.pre("save", function (next) {
//   const validIcons = [
//     "facebook",
//     "twitter",
//     "linkedin",
//     "instagram",
//     "github",
//     "behance",
//     "dribbble",
//     "others",
//   ];

//   this.links.forEach((link) => {
//     console.log(`Checking icon: ${link.icon}`);
//     if (!validIcons.includes(link.icon)) {
//       console.log(`Invalid icon: ${link.icon}`);
//       throw new Error(`Invalid icon: ${link.icon}`);
//     }
//   });

//   console.log("All icons are valid");
//   next();
// });

const Team = mongoose.model("Team", teamSchema);
export default Team;

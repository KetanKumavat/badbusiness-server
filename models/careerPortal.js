import mongoose from "mongoose";

const careerPortalSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  jobType: [
    {
      type: String,
    },
  ],
  link: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  stipend: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

const CareerPortal = mongoose.model("CareerPortal", careerPortalSchema);
export default CareerPortal;

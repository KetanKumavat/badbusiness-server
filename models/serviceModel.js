import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    title: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;

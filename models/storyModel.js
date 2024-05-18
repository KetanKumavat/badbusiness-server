import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  headline: { type: String, required: true },
  url: { type: String, required: true },
  type: {
    type: String,
    enum: ["instagram", "facebook", "youtube"],
    required: true,
  },
});

const Story = mongoose.model("Story", storySchema);
export default Story;

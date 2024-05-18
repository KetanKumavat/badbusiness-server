import mongoose from "mongoose";

const hallOfFameSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  solution: {
    solutionName: { type: String, required: true },
    implementation: { type: String, required: true },
  },
  result: { type: String, required: true },
});

const HallOfFame = mongoose.model("HallOfFame", hallOfFameSchema);
export default HallOfFame;

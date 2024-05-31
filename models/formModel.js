import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  problem: { type: String, required: true },
  domain: { type: String, required: true },
});

const Form = mongoose.model("Form", formSchema);
export default Form;

import Form from "../models/formModel.js";

export const submitForm = async (req, res) => {
  const { name, email, phone, companyName, problem, domain } = req.body;

  const newForm = new Form({
    name,
    email,
    phone,
    companyName,
    problem,
    domain,
  });

  try {
    await newForm.save();
    res
      .status(201)
      .json({ success: true, message: "Form submitted successfully", newForm });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ success: true, forms });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    res.status(200).json({ success: true, form });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

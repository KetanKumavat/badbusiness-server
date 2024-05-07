import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const addAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
    });
    await admin.save();
    res
      .status(201)
      .json({ success: true, message: "Admin added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

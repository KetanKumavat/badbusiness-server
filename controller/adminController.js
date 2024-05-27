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

export const removeAdminFromDb = async (req, res) => {
  const { email } = req.params;
  const { userEmail, password } = req.body;
  if (!userEmail || !password)
    return res.status(400).json({
      success: false,
      message: "Please provide your email and password",
    });
  try {
    const user = await User.findOne({ email: userEmail });
    // console.log(user);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    if (!user.isAdmin)
      return res
        .status(404)
        .json({ success: false, message: "User Unauthorised" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    const admin = await User.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    await User.findOneAndDelete({ email: email });
    res
      .status(200)
      .json({ success: true, message: "Admin Deleted from Database" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeAsAdmin = async (req, res) => {
  const { email } = req.params;
  const { userEmail, password } = req.body;
  if (!userEmail || !password)
    return res.status(400).json({
      success: false,
      message: "Please provide your email and password",
    });
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    if (!user.isAdmin)
      return res
        .status(404)
        .json({ success: false, message: "User Unauthorised" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    const admin = await User.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    const updatedAdmin = await User.findOneAndUpdate(
      { email },
      { isAdmin: false },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Admin rights removed successfully",
      user: updatedAdmin,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdminDetails = async (req, res) => {
  const { email } = req.params;
  const { userEmail, password, newUsername, newEmail, newPassword } = req.body;
  if (!userEmail || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide your email and password",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isAdmin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }
    if (newUsername) {
      user.username = newUsername;
    }
    if (newEmail) {
      user.email = newEmail;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Admin details updated successfully",
      admin: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true });
    res.status(200).json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

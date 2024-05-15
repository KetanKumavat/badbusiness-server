import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res
      .status(400)
      .json({ success: false, message: "All fields are mandatory !" });
    throw new Error("All fields are mandatory !");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({
      success: false,
      message: "User Already Exists",
    });
    throw new Error("User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created: ${user}`);
  if (user) {
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400).json({ success: false, message: "User Data is Invalid" });
    throw new Error("User Data is Invalid");
  }
  res.json({ message: "Register The User" });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "All Fields are Mandatory" });
    throw new Error("All Fields are Mandatory");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      accessToken,
      name: user.username,
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
    });
    // console.log("Decoded User:", req.user);
  } else {
    res.status(401).json({ message: "Email/Password is Invalid" });
    throw new Error("Email/Password is Invalid");
  }
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: "Email is required" });
    return;
  }
  // console.log("Email:", email);
  // console.log("User Email:", req.user.email);
  if (email !== req.user.email) {
    res.status(403).json({ success: false, message: "Unauthorized User" });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken) {
    res
      .status(401)
      .json({ success: false, message: "No refresh token provided" });
    return;
  }

  jwt.verify(
    refreshToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ success: false, message: "Invalid refresh token" });
        return;
      }

      const newRefreshToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
            isAdmin: user.isAdmin,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        // user,
        refreshToken: newRefreshToken,
      });
    }
  );
});

import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js";
import {
  userRoutes,
  eventRoutes,
  adminRoutes,
  serviceRoutes,
  teamRoutes,
  partnerRoutes,
  storyRoutes,
  HoFRoutes,
  blogRoutes,
  formRoutes,
  careerRoutes,
} from "./routes/index.js";

import cors from "cors";

const app = express();
app.use(cors());

dotenv.config();

const port = process.env.PORT || 3000;

connectDb();

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is online." });
});

app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/team", teamRoutes);
app.use("/api/v1/partner", partnerRoutes);
app.use("/api/v1/story", storyRoutes);
app.use("/api/v1/hof", HoFRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/form", formRoutes);
app.use("/api/v1/career", careerRoutes);

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

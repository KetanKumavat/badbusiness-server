import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";

const app = express();
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

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

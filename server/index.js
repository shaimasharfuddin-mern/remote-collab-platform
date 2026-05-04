require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const teamRoutes = require("./routes/team");

const app = express();

// 🔓 Middlewares
app.use(cors({
  origin: "*",
}));

app.use(express.json());

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/team", teamRoutes);

// 🧠 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error ❌", err));

// 🚀 Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🚀 Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
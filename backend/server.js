
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
// const contestRoutes = require("./routes/contestRoutes");
const contestRoutes = require("./routes/contest");
const historyRoutes = require("./routes/history");

// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
console.log("Connecting to MongoDB:");
console.log("🚀 Starting backend server...");

app.use("/api/auth", authRoutes);
// app.use("/api/contest", contestRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 5000;
console.log(PORT);
// const PORT = 5000;
console.log("Connecting to MongoDB:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
//   app._router.stack.forEach((r) => {
//   if (r.route && r.route.path) {
//     console.log("Route:", r.route.path);
//   } else if (r.name === "router") {
//     r.handle.stack.forEach((h) =>
//       console.log("Route:", (h.route && h.route.path) || "middleware")
//     );
//   }
// });
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  // app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:5000`));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

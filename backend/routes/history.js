const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ContestHistory = require("../models/ContestHistory");

// backend/routes/history.js
// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const ContestHistory = require("../models/ContestHistory");

// 📜 GET /api/history — Get all contests of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const history = await ContestHistory.find({ userId: req.user.id })
      .sort({ date: -1 });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📜 GET /api/history/:id — Get details of a specific contest
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const record = await ContestHistory.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!record) {
      return res.status(404).json({ message: "Contest not found" });
    }

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


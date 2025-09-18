const express = require("express");
const ContestHistory = require("../models/ContestHistory");
const router = express.Router();

// Get all history for a user
router.get("/", async (req, res) => {
  try {
    const histories = await ContestHistory.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(histories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get contest details
// router.get("/:id", async (req, res) => {
//   try {
//     const history = await ContestHistory.findById(req.params.id);
//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// GET /api/history
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const histories = await ContestHistory.find({ userId }).sort({ date: -1 });
  res.json(histories);
});

// GET /api/history/:id
router.get("/:id", authMiddleware, async (req, res) => {
  const history = await ContestHistory.findById(req.params.id);
  if (!history) return res.status(404).json({ message: "Not found" });
  res.json(history);
});

module.exports = router;

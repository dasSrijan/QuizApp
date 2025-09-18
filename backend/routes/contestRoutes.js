const express = require("express");
const Subject = require("../models/Subject");
const Question = require("../models/Question");

const router = express.Router();

// 📌 Get all subjects
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching subjects" });
  }
});

// 📌 Get questions for a subject & contest type
router.get("/questions/:subjectId", async (req, res) => {
  const { subjectId } = req.params;
  const { count } = req.query; // count = 5, 10, or 20

  try {
    const questions = await Question.aggregate([
      { $match: { subject: subjectId } },
      { $sample: { size: parseInt(count) } }
    ]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching questions" });
  }
});

module.exports = router;

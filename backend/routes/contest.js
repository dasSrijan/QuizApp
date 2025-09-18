const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Subject = require("../models/Subject");
const authMiddleware = require("../middleware/authMiddleware");
const ContestHistory = require("../models/ContestHistory");

// Get all contest histories for logged-in user
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const histories = await ContestHistory.find({ userId: req.user.id })
      .sort({ date: -1 }); // latest first
    res.json(histories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🎯 GET /api/contest/history/:id
// Get one contest's details for the logged-in user
router.get("/history/:id", authMiddleware, async (req, res) => {
  try {
    const contest = await ContestHistory.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }
    console.log("HISTORY RETURNED:", contest); // 👈 add this
    // res.json(contest);
    res.json(contest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// 🎯 POST /api/contest/start
// Body: { standard, subjectName, length, year?, stream? }
router.post("/start", authMiddleware, async (req, res) => {
  try {
    const { standard, subjectName, length, year, stream } = req.body;

    if (!standard || !subjectName || !length) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // 1️⃣ Find the subject
    let subjectQuery = { name: subjectName };

    if (standard.startsWith("class-")) {
      subjectQuery.standard = standard; // e.g., "class-10"
    } else if (standard === "college" && year && stream) {
      subjectQuery.standard = "college";
      subjectQuery.year = year;
      subjectQuery.stream = stream;
    }

    const subject = await Subject.findOne(subjectQuery);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // 2️⃣ Get random questions
    const questions = await Question.aggregate([
      { $match: { subjectId: subject._id } },
      { $sample: { size: parseInt(length) } } // random N
    ]);

    if (!questions.length) {
      return res.status(404).json({ message: "No questions available" });
    }

    // 3️⃣ Return without the correct answers
    const safeQuestions = questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options,
    }));

    res.json({
      subject: subject.name,
      standard,
      total: safeQuestions.length,
      questions: safeQuestions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// 🎯 POST /api/contest/submit
// there is another same path you can use that as well
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    

    const { standard, subject, contestLength, questions, year, stream } = req.body;
    // console.log("Incoming Question IDs:", questions.map(q => q.questionId));
    // console.log("DB Question IDs:", dbQuestions.map(q => q._id.toString()));
    // Validate basic structure
    if (!standard || !subject || !contestLength || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert all IDs to strings to avoid ObjectId comparison issues
    const questionIds = questions
      .map(q => q?.questionId)
      .filter(Boolean);

    if (!questionIds.length) {
      return res.status(400).json({ message: "No valid question IDs provided" });
    }

    // Fetch DB questions
    const dbQuestions = await Question.find({ _id: { $in: questionIds } });
    console.log("Incoming Question IDs:", questions.map(q => q.questionId));
    console.log("DB Question IDs:", dbQuestions.map(q => q._id.toString()));
    let score = 0;

    const detailedQuestions = questions.map(userQ => {
      const dbQ = dbQuestions.find(q => q._id.toString() === String(userQ?.questionId));

      if (!dbQ) {
        console.warn("No matching DB question for", userQ?.questionId);
        return null;
      }

      // Safe option handling (string or object)
      const optionsArray = dbQ.options.map(opt =>
        typeof opt === "string" ? opt : opt?.optionText || ""
      );

      const userAnsIndex = typeof userQ?.userAnswer === "number"
        ? userQ.userAnswer
        : -1;

      const correctIndex = typeof dbQ.correctAnswerIndex === "number"
        ? dbQ.correctAnswerIndex
        : Number(dbQ.correctAnswerIndex);

      const isCorrect = userAnsIndex === correctIndex;
      if (isCorrect) score++;

      return {
        questionText: dbQ.questionText,
        options: optionsArray,
        correctAnswer: correctIndex,
        userAnswer: userAnsIndex,
        isCorrect
      };
    }).filter(Boolean);

    // Save history
    const historyDoc = await ContestHistory.create({
      userId: req.user.id,
      date: new Date(),
      standard,
      year: year || null,
      stream: stream || null,
      subject,
      contestLength,
      score,
      totalMarks: contestLength,
      questions: detailedQuestions
    });

    console.log("DETAILED QUESTIONS:", detailedQuestions);

    return res.json({
      message: "Contest submitted successfully",
      score,
      total: contestLength,
      historyId: historyDoc._id
    });

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/submit", authMiddleware, async (req, res) => {
//   try {
//     console.log("REQ BODY:", req.body);
//     const { standard, subject, contestLength, questions, year, stream } = req.body;

//     if (!standard || !subject || !contestLength || !Array.isArray(questions)) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Fetch all question IDs to get the correct answers
//     const questionIds = questions.map(q => q.questionId);
//     const dbQuestions = await Question.find({ _id: { $in: questionIds } });

//     let score = 0;
//     const detailedQuestions = questions.map(userQ => {
//       const dbQ = dbQuestions.find(q => q._id.toString() === userQ.questionId);
//       if (!dbQ) {
//         console.error("No matching DB question for", userQ.questionId);
//       }
//       if (!dbQ) return null;

//       const isCorrect = userQ.userAnswer === dbQ.correctAnswerIndex;
//       if (isCorrect) score++;

//       return {
//         questionText: dbQ.questionText,
//         options: dbQ.options.map(o => o.optionText),
//         correctAnswer: dbQ.correctAnswerIndex,
//         userAnswer: userQ.userAnswer,
//         isCorrect
//       };
//     }).filter(Boolean);

//     // Save to history
//     const historyDoc = await ContestHistory.create({
//       userId: req.user.id,
//       date: new Date(),
//       standard,
//       year: year || null,
//       stream: stream || null,
//       subject,
//       contestLength,
//       score,
//       totalMarks: contestLength,
//       questions: detailedQuestions
//     });
//     console.log("DETAILED QUESTIONS:", detailedQuestions);
//     res.json({
//       message: "Contest submitted successfully",
//       score,
//       total: contestLength,
//       historyId: historyDoc._id
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// router.post("/submit", authMiddleware, async (req, res) => {
//   try {
//     const { standard, subjectName, length, year, stream, questions } = req.body;

//     if (!standard || !subjectName || !length || !Array.isArray(questions)) {
//       return res.status(400).json({ message: "Missing required parameters" });
//     }

//     // 1️⃣ Find subject
//     let subjectQuery = { name: subjectName };

//     if (standard.startsWith("class-")) {
//       subjectQuery.standard = standard;
//     } else if (standard === "college" && year && stream) {
//       subjectQuery.standard = "college";
//       subjectQuery.year = year;
//       subjectQuery.stream = stream;
//     }

//     const subject = await Subject.findOne(subjectQuery);
//     if (!subject) {
//       return res.status(404).json({ message: "Subject not found" });
//     }

//     // 2️⃣ Get all questions from DB for grading
//     const ids = questions.map(q => q.questionId);
//     const dbQuestions = await Question.find({ _id: { $in: ids } });

//     // 3️⃣ Prepare history record
//     let score = 0;
//     const detailedQuestions = questions.map(userQ => {
//       const dbQ = dbQuestions.find(q => q._id.toString() === userQ.questionId);
//       if (!dbQ) return null;

//       const isCorrect = userQ.selectedAnswer === dbQ.correctAnswerIndex;
//       if (isCorrect) score++;

//       return {
//         questionText: dbQ.questionText,
//         options: dbQ.options.map(o => o.optionText),
//         correctAnswer: dbQ.correctAnswerIndex,
//         userAnswer: userQ.selectedAnswer,
//         isCorrect
//       };
//     }).filter(Boolean);

//     // 4️⃣ Save to ContestHistory
//     const ContestHistory = require("../models/ContestHistory");
//     const historyDoc = new ContestHistory({
//       userId: req.user.id,
//       standard: standard.startsWith("class-") ? standard : undefined,
//       college: standard === "college",
//       year: year || undefined,
//       stream: stream || undefined,
//       subject: subjectName,
//       contestLength: length,
//       score,
//       totalMarks: detailedQuestions.length,
//       questions: detailedQuestions
//     });

//     await historyDoc.save();

//     // 5️⃣ Respond with result
//     res.json({
//       message: "Contest submitted successfully",
//       score,
//       total: detailedQuestions.length,
//       percent: ((score / detailedQuestions.length) * 100).toFixed(2),
//       historyId: historyDoc._id
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.post("/submit", authMiddleware, async (req, res) => {
//   try {
//     const { standard, subjectName, length, year, stream, answers } = req.body;

//     if (!standard || !subjectName || !length || !answers) {
//       return res.status(400).json({ message: "Missing required parameters" });
//     }

//     // 1️⃣ Find subject
//     let subjectQuery = { name: subjectName };
//     if (standard.startsWith("class-")) {
//       subjectQuery.standard = standard;
//     } else if (standard === "college" && year && stream) {
//       subjectQuery.standard = "college";
//       subjectQuery.year = year;
//       subjectQuery.stream = stream;
//     }

//     const subject = await Subject.findOne(subjectQuery);
//     if (!subject) {
//       return res.status(404).json({ message: "Subject not found" });
//     }

//     const questionIds = Object.keys(answers);
//     const questions = await Question.find({ _id: { $in: questionIds } });

//     // 2️⃣ Calculate score and detailed results
//     let score = 0;
//     const detailedResults = questions.map(q => {
//       const selected = answers[q._id];
//       const isCorrect = selected === q.correctAnswerIndex;
//       if (isCorrect) score++;

//       return {
//         questionText: q.questionText,
//         options: q.options.map(o => o.optionText),
//         correctAnswer: q.correctAnswerIndex,
//         userAnswer: selected,
//         isCorrect
//       };
//     });

//     // 3️⃣ Save to ContestHistory
//     const historyEntry = new ContestHistory({
//       userId: req.user.id,
//       date: new Date(),
//       standard: standard.startsWith("class-") ? standard : undefined,
//       college: standard === "college",
//       year: year || undefined,
//       stream: stream || undefined,
//       subject: subject.name,
//       contestLength: parseInt(length),
//       score,
//       totalMarks: questions.length,
//       questions: detailedResults
//     });

//     await historyEntry.save();

//     // 4️⃣ Send response
//     res.json({
//       message: "Contest submitted successfully",
//       score,
//       total: questions.length,
//       results: detailedResults
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;

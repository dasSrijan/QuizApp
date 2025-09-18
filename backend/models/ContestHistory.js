const mongoose = require("mongoose");

const contestHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  standard: { type: String }, // class-1 to class-12
  college: { type: Boolean, default: false },
  year: { type: String }, // only for college
  stream: { type: String }, // only for college
  subject: { type: String, required: true },
  contestLength: { type: Number, required: true }, // 5, 10, 20
  score: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: Number, // index of correct option
      userAnswer: Number, // index of user's answer
      isCorrect: Boolean
    }
  ]
});

module.exports = mongoose.model("ContestHistory", contestHistorySchema);

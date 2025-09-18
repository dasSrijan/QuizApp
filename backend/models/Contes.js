const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  contestType: { type: String, enum: ["5Q", "10Q", "20Q"], required: true },
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      selectedAnswerIndex: { type: Number }, // 0-3 or null if skipped
      isCorrect: { type: Boolean }
    }
  ],
  score: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 }, // percentage
  duration: { type: Number }, // in minutes
}, { timestamps: true });

module.exports = mongoose.model("Contest", contestSchema);

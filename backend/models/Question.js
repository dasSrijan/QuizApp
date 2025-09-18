const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  questionText: { type: String, required: true },
  options: [
    { type: String, required: true } 
  ],
  correctAnswerIndex: { type: Number, required: true }, // 0-3 for 4 options
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);

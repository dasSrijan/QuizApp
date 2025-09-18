const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Physics, CSE Fundamentals
  standard: { type: String, required: true }, // e.g., "class-10", "college-1st"
  stream: { type: String }, // e.g., CSE, ECE, Mechanical (only for college)
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);

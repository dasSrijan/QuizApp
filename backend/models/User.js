const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String }, // optional
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

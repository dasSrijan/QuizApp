// backend/seedQuestions.js
require("dotenv").config();
const mongoose = require("mongoose");
const Subject = require("./models/Subject");
const Question = require("./models/Question");

// Import your manual list for ONE subject
const { mathClass10Questions } = require("./questions/class10_math");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // 1️⃣ Find the subject in DB
    const subject = await Subject.findOne({ name: "Mathematics", standard: "class-10" });
    if (!subject) {
      console.error("❌ Subject not found in DB");
      process.exit(1);
    }

    // 2️⃣ Clear old questions for that subject
    await Question.deleteMany({ subject: subject._id });

    // 3️⃣ Prepare and insert new ones
    const questionsToInsert = mathClass10Questions.map(q => ({
      subjectId: subject._id,
      questionText: q.questionText,
      options: q.options,
      correctAnswerIndex: q.correctAnswer
    }));

    await Question.insertMany(questionsToInsert);
    console.log(`✅ Inserted ${questionsToInsert.length} questions for ${subject.name} - ${subject.standard}`);

    process.exit();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });

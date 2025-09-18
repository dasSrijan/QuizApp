// backend/seedQuestions.js
require("dotenv").config();
const mongoose = require("mongoose");
const Subject = require("./models/Subject");
const Question = require("./models/Question");
console.log("🚀 Running SEED script from:", __filename);

const subjectsData = require("./questions");
// console.log("📚 subjectsData raw:", subjectsData);
// console.log("📚 subjectsData length:", subjectsData?.length || 0);
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    for (const entry of subjectsData) {
      const { subject, questions } = entry;

      let subjectDoc = await Subject.findOne(subject);
      if (!subjectDoc) {
        subjectDoc = await Subject.create(subject);
        console.log(`📘 Created subject: ${subject.name} (${subject.standard})`);
      }

      await Question.deleteMany({ subjectId: subjectDoc._id });

      const formatted = questions.map(q => ({
        subjectId: subjectDoc._id,
        questionText: q.questionText,
        options: q.options,
        correctAnswerIndex: q.correctAnswer,
      }));

      await Question.insertMany(formatted);
      console.log(`✅ Inserted ${formatted.length} questions for ${subject.name} (${subject.standard})`);
    }

    process.exit();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });

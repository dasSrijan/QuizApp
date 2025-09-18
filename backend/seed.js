const mongoose = require("mongoose");
const Subject = require("./models/Subject");
const Question = require("./models/Question");
const dotenv = require("dotenv");
dotenv.config();
// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});
// mongoose.connect("process.env.MONGO_URI", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error(err));

const btechStreams = ["CSE", "ECE", "Mechanical", "Civil"];

// 🔹 Function to create subjects
const createSubjects = async () => {
  const subjects = [];

  // Classes 1–12
  for (let i = 1; i <= 12; i++) {
    subjects.push({ name: `Mathematics`, standard: `class-${i}` });
    subjects.push({ name: `Science`, standard: `class-${i}` });
  }

  // College (B.Tech) → Year × Stream
  for (let year = 1; year <= 4; year++) {
    btechStreams.forEach(stream => {
      subjects.push({ name: `${stream} Fundamentals`, standard: `college-${year}`, stream });
      subjects.push({ name: `${stream} Advanced`, standard: `college-${year}`, stream });
    });
  }

  const createdSubjects = await Subject.insertMany(subjects);
  console.log(`✅ Inserted ${createdSubjects.length} subjects`);
  return createdSubjects;
};

// 🔹 Function to create 40 sample questions per subject
const createQuestions = async (subjects) => {
  const allQuestions = [];

  subjects.forEach(subject => {
    for (let i = 1; i <= 40; i++) {
      allQuestions.push({
        subjectId: subject._id,
        questionText: `Sample Question ${i} for ${subject.name} (${subject.standard})`,
        options: [
          { optionText: "Option A" },
          { optionText: "Option B" },
          { optionText: "Option C" },
          { optionText: "Option D" }
        ],
        correctAnswerIndex: Math.floor(Math.random() * 4)
      });
    }
  });

  const createdQuestions = await Question.insertMany(allQuestions);
  console.log(`✅ Inserted ${createdQuestions.length} questions`);
};

// 🔹 Run the Seeder
const seedDatabase = async () => {
  try {
    await Subject.deleteMany({});
    await Question.deleteMany({});
    console.log("🗑 Cleared old data");

    const subjects = await createSubjects();
    await createQuestions(subjects);

    console.log("🎯 Database seeding complete");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    mongoose.connection.close();
  }
};

seedDatabase();

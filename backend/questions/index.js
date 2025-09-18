// backend/questions/index.js

// Import all subjects per class
const { mathClass1Questions } = require("./class1_math");
const { scienceClass1Questions } = require("./class1_science");
const { englishClass1Questions } = require("./class1_english");
const { geographyClass1Questions } = require("./class1_geography");
const { historyClass1Questions } = require("./class1_history");
const { computerScienceClass1Questions } = require("./class1_comsc");

const { mathClass2Questions } = require("./class2_math");
const { scienceClass2Questions } = require("./class2_science");
const { englishClass2Questions } = require("./class2_english");
const { geographyClass2Questions } = require("./class2_geography");
const { historyClass2Questions } = require("./class2_history");
const { computerScienceClass2Questions } = require("./class2_comsc");

const { mathClass3Questions } = require("./class3_math");
const { scienceClass3Questions } = require("./class3_science");
const { englishClass3Questions } = require("./class3_english");
const { geographyClass3Questions } = require("./class3_geography");
const { historyClass3Questions } = require("./class3_history");
const { computerScienceClass3Questions } = require("./class3_comsc");

const { mathClass4Questions } = require("./class4_math");
const { scienceClass4Questions } = require("./class4_science");
const { englishClass4Questions } = require("./class4_english");
const { geographyClass4Questions } = require("./class4_geography");
const { historyClass4Questions } = require("./class4_history");
const { computerScienceClass4Questions } = require("./class4_comsc");

const { mathClass5Questions } = require("./class5_math");
const { scienceClass5Questions } = require("./class5_science");
const { englishClass5Questions } = require("./class5_english");
const { geographyClass5Questions } = require("./class5_geography");
const { historyClass5Questions } = require("./class5_history");
const { computerScienceClass5Questions } = require("./class5_comsc");

const { mathClass6Questions } = require("./class6_math");
const { scienceClass6Questions } = require("./class6_science");
const { englishClass6Questions } = require("./class6_english");
const { geographyClass6Questions } = require("./class6_geography");
const { historyClass6Questions } = require("./class6_history");
const { computerScienceClass6Questions } = require("./class6_comsc");

const { mathClass7Questions } = require("./class7_math");
const { scienceClass7Questions } = require("./class7_science");
const { englishClass7Questions } = require("./class7_english");
const { geographyClass7Questions } = require("./class7_geography");
const { historyClass7Questions } = require("./class7_history");
const { computerScienceClass7Questions } = require("./class7_comsc");

const { mathClass8Questions } = require("./class8_math");
const { scienceClass8Questions } = require("./class8_science");
const { englishClass8Questions } = require("./class8_english");
const { geographyClass8Questions } = require("./class8_geography");
const { historyClass8Questions } = require("./class8_history");
const { computerScienceClass8Questions } = require("./class8_comsc");

const allSubjects = [
  // ✅ Class 1
  { subject: { name: "Mathematics", standard: "class-1" }, questions: mathClass1Questions },
  { subject: { name: "Science", standard: "class-1" }, questions: scienceClass1Questions },
  { subject: { name: "English", standard: "class-1" }, questions: englishClass1Questions },
  { subject: { name: "Geography", standard: "class-1" }, questions: geographyClass1Questions },
  { subject: { name: "History", standard: "class-1" }, questions: historyClass1Questions },
  { subject: { name: "Computer Science", standard: "class-1" }, questions: computerScienceClass1Questions },

  // ✅ Class 2
  { subject: { name: "Mathematics", standard: "class-2" }, questions: mathClass2Questions },
  { subject: { name: "Science", standard: "class-2" }, questions: scienceClass2Questions },
  { subject: { name: "English", standard: "class-2" }, questions: englishClass2Questions },
  { subject: { name: "Geography", standard: "class-2" }, questions: geographyClass2Questions },
  { subject: { name: "History", standard: "class-2" }, questions: historyClass2Questions },
  { subject: { name: "Computer Science", standard: "class-2" }, questions: computerScienceClass2Questions },

  // ✅ Class 3
  { subject: { name: "Mathematics", standard: "class-3" }, questions: mathClass3Questions },
  { subject: { name: "Science", standard: "class-3" }, questions: scienceClass3Questions },
  { subject: { name: "English", standard: "class-3" }, questions: englishClass3Questions },
  { subject: { name: "Geography", standard: "class-3" }, questions: geographyClass3Questions },
  { subject: { name: "History", standard: "class-3" }, questions: historyClass3Questions },
  { subject: { name: "Computer Science", standard: "class-3" }, questions: computerScienceClass3Questions },

  // ✅ Class 4
  { subject: { name: "Mathematics", standard: "class-4" }, questions: mathClass4Questions },
  { subject: { name: "Science", standard: "class-4" }, questions: scienceClass4Questions },
  { subject: { name: "English", standard: "class-4" }, questions: englishClass4Questions },
  { subject: { name: "Geography", standard: "class-4" }, questions: geographyClass4Questions },
  { subject: { name: "History", standard: "class-4" }, questions: historyClass4Questions },
  { subject: { name: "Computer Science", standard: "class-4" }, questions: computerScienceClass4Questions },

  // ✅ Class 5
  { subject: { name: "Mathematics", standard: "class-5" }, questions: mathClass5Questions },
  { subject: { name: "Science", standard: "class-5" }, questions: scienceClass5Questions },
  { subject: { name: "English", standard: "class-5" }, questions: englishClass5Questions },
  { subject: { name: "Geography", standard: "class-5" }, questions: geographyClass5Questions },
  { subject: { name: "History", standard: "class-5" }, questions: historyClass5Questions },
  { subject: { name: "Computer Science", standard: "class-5" }, questions: computerScienceClass5Questions },

  // ✅ Class 6
  { subject: { name: "Mathematics", standard: "class-6" }, questions: mathClass6Questions },
  { subject: { name: "Science", standard: "class-6" }, questions: scienceClass6Questions },
  { subject: { name: "English", standard: "class-6" }, questions: englishClass6Questions },
  { subject: { name: "Geography", standard: "class-6" }, questions: geographyClass6Questions },
  { subject: { name: "History", standard: "class-6" }, questions: historyClass6Questions },
  { subject: { name: "Computer Science", standard: "class-6" }, questions: computerScienceClass6Questions },

  // ✅ Class 7
  { subject: { name: "Mathematics", standard: "class-7" }, questions: mathClass7Questions },
  { subject: { name: "Science", standard: "class-7" }, questions: scienceClass7Questions },
  { subject: { name: "English", standard: "class-7" }, questions: englishClass7Questions },
  { subject: { name: "Geography", standard: "class-7" }, questions: geographyClass7Questions },
  { subject: { name: "History", standard: "class-7" }, questions: historyClass7Questions },
  { subject: { name: "Computer Science", standard: "class-7" }, questions: computerScienceClass7Questions },

  // ✅ Class 8
  { subject: { name: "Mathematics", standard: "class-8" }, questions: mathClass8Questions },
  { subject: { name: "Science", standard: "class-8" }, questions: scienceClass8Questions },
  { subject: { name: "English", standard: "class-8" }, questions: englishClass8Questions },
  { subject: { name: "Geography", standard: "class-8" }, questions: geographyClass8Questions },
  { subject: { name: "History", standard: "class-8" }, questions: historyClass8Questions },
  { subject: { name: "Computer Science", standard: "class-8" }, questions: computerScienceClass8Questions },
];

console.log("📚 Exporting subjects:", allSubjects.length);
module.exports = allSubjects;

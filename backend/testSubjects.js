const subjectsData = require("./questions");

console.log("✅ Loaded subjects:", subjectsData.length);
subjectsData.forEach((s, idx) => {
  console.log(idx + 1, s.subject.name, "-", s.subject.standard, ":", s.questions.length, "questions");
});

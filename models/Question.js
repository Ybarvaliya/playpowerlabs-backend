const mongoose = require("mongoose");

// Question Schema
const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true }, // Reference to the Quiz
  question: { type: String, required: true }, // The question text
  options: {
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    optionC: { type: String, required: true },
    optionD: { type: String, required: true },
  },
  trueAns: { type: String, required: true }, // Correct answer (e.g., "optionA")
});

// Question Model
const Question = mongoose.model("Question", questionSchema);

module.exports = Question
  

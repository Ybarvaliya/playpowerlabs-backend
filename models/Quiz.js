const mongoose = require("mongoose");

/// Quiz Schema
const quizSchema = new mongoose.Schema(
  {
    grade: { type: Number, required: true }, // Grade level
    subject: { type: String, required: true }, // Subject of the quiz
    queIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // List of Question IDs
    resIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserResponse" }], // List of User Response IDs
  },
  { timestamps: true }
);

// Quiz Model
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
  
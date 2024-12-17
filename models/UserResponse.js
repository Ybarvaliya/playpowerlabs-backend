const mongoose = require("mongoose");

// User Response Schema
const userResponseSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    }, // Reference to the Quiz
    answers: [
      {
        queId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        }, // Reference to the Question
        selectedOption: { type: String, required: true }, // User's selected answer (e.g., "optionA")
      },
    ],
    score: { type: Number, required: true }, // Total score achieved
  },
  { timestamps: true }
);

// User Response Model
const UserResponse = mongoose.model("UserResponse", userResponseSchema);

module.exports = UserResponse;

require("dotenv").config();

const Quiz = require("../models/Quiz")
const Question = require("../models/Question")
const UserResponse = require("../models/UserResponse")

const groq = require("../config/groq")

exports.createQuiz = async (req, res) => {
  
  const { grade, subject, totalQue, maxScore, difficulty } = req.body;

  if (!grade || !subject || !totalQue || !maxScore || !difficulty) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {

    const prompt = `
      Generate questions for a quiz:
      Grade: ${grade}, Subject: ${subject}, Total Questions: ${totalQue},
      Difficulty: ${difficulty}, Max Score: ${maxScore}.
      Generate TRUE ANSWERS and give correct option which have true answer of the quiz question you generated
      There must be 4 Options as string for every question. Give all questions, options, answers ( A B C or D ) into Json Format.
      Just provide me JSON Array, DO NOT give me extra things like 'Here is the respo....' or any kind of extra details,
    `;

    try {
      var chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192",
      });
    } catch (error) {
      console.error("Error in getGroqChatCompletion:", error.message);
      throw error; // Rethrow error to handle it in the calling function
    }

    questions = JSON.parse(chatCompletion.choices[0]?.message?.content || "[]");

    const quiz = new Quiz({
      grade,
      subject,
      queIds: [],
    });

    for (const q of questions) {
      const question = new Question({
        quizId: quiz._id,
        question: q.question,
        options: {
          optionA: q.options[0],
          optionB: q.options[1],
          optionC: q.options[2],
          optionD: q.options[3],
        },
        trueAns: q.answer,
      });
      await question.save();
      quiz.queIds.push(question._id);
    }

    await quiz.save();

    res
      .status(200)
      .json({ message: "Quiz generated and saved successfully.", quiz });

  } catch (error) {
    console.error("Error in POST /send:", error.message);
    res.status(500).json({ error: "Failed to process your request." });
  }
};

exports.submitAnswers = async (req, res) => {
  const { quizId, responses } = req.body;

  if (!quizId || !responses || !Array.isArray(responses)) {
    return res
      .status(400)
      .json({ error: "Invalid input. Provide quizId and responses array." });
  }

  try {
    // Find the quiz
    const quiz = await Quiz.findById(quizId).populate("queIds");
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    let score = 0;

    // Check the user's responses against the correct answers
    for (const response of responses) {
      const question = await Question.findById(response.questionId);
      if (question) {
        if (question.trueAns === response.selectedOption) {
          score++;
        }
      }
    }

    // Save user response in the database
    const userResponse = new UserResponse({
      quizId,
      answers: responses.map((response) => ({
        queId: response.questionId,
        selectedOption: response.selectedOption,
      })),
      score,
    });

    await userResponse.save();

    // Update the quiz's resIds array
    quiz.resIds.push(userResponse._id);
    await quiz.save();

    // Return the score
    res
      .status(200)
      .json({ score, message: "User responses saved successfully." });
  } catch (error) {
    console.error("Error in POST /giveAnswers:", error.message);
    res.status(500).json({ error: "Failed to process the request." });
  }
};

exports.getQuizHistory = async (req, res) => {
  const { quizId, grade, subject, minScore, maxScore, from, to } = req.body;
  
    try {
      // Build the query object
      const query = {};
      if (quizId) query._id = quizId; // Filter by quiz ID
      if (grade) query.grade = grade; // Filter by grade
      if (subject) query.subject = subject; // Filter by subject
  
      // Find quizzes that match the query
      let quizzes = await Quiz.find(query)
        .populate({
          path: "queIds", // Populate questions
          select: "question options trueAns",
          match: {}, // Only populate existing documents
        })
        .populate({
          path: "resIds",
          match: {
            ...(minScore != null && { score: { $gte: minScore } }),
            ...(maxScore != null && { score: { $lte: maxScore } }),
            ...(from &&
              to && {
                createdAt: { $gte: new Date(from), $lte: new Date(to) },
              }),
          },
          populate: { path: "answers.queId", select: "question options" },
        });
  
      // Filter out quizzes with no matching responses or valid questions
      quizzes = quizzes.filter((quiz) => quiz.queIds.length > 0);
  
      // Format the response data
      const result = quizzes.map((quiz) => ({
        quizId: quiz._id,
        grade: quiz.grade,
        subject: quiz.subject,
        questions: quiz.queIds.map((que) => ({
          Question: que?.question || "Question missing",
          Options: que?.options || {},
          Answer: que?.trueAns || "",
        })),
        createdAt: quiz.createdAt,
        responses: quiz.resIds.map((res) => ({
          responseId: res._id,
          score: res.score,
          answers: res.answers.map((ans) => ({
            question: ans.queId?.question || "Question missing",
            selectedOption: ans.selectedOption,
            correctAnswer: ans.queId?.trueAns || "N/A",
          })),
          createdAt: res.createdAt,
        })),
      }));
  
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error in POST /history:", error.message);
      res
        .status(500)
        .json({ success: false, error: "Failed to retrieve quiz history." });
    }
};

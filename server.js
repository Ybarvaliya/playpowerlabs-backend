require("dotenv").config();

const express = require("express");
const { createQuiz, submitAnswers, getQuizHistory } = require("./controller/quizController");
const jwt = require("jsonwebtoken");
const connectToMongoDB = require("./config/database");

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const mockUser = {
  username: "testUser", 
  password: "password123", 
};
const JWT_SECRET = process.env.JWT_SECRET || "hello";

// Routes

// Route to handle login and return a JWT token
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

app.post("/create", createQuiz);      // Endpoint to create a quiz
app.post("/submit", submitAnswers);   // Endpoint to submit answers
app.post("/history", getQuizHistory); // Endpoint to get quiz history


// Sync Database and Start Server
connectToMongoDB()
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

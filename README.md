# Quiz Application - Backend:

## Technology: Node.js
Database: MongoDB
AI: Groq

## Setup:
- unzip file
- open terminal and run -> npm i
- create .env file and make 2 variables: GROQ_API_KEY, JWT_SECRET(Add your own data) 
- nodemon server.js 

## Usecase:
contains 4 API endpoints:
login - to get JWT token as response (entering correct username and passsword)

create - to create quiz question using AI
       - it will create question, options, true answers based on parameters like grade, subject, difficulty, total_questions, max_score 

submit - to submit your answers for specific quiz and questions
       - can submit multiple times (every response and score will be avaible)
       - you have to provide data like quiz_id and que_id and your chosen option (e.g. 'A')
       for every question and it will return evaluated score and save all responses

history - to filter quiz using quizId, subject, grade, created_date(from:to) etc.
        - you can see quizes with questions, options, correct answers, users_response of different times, user scores

## API documentation is given in file named as "API_Documenatation.md" in the root folder.

## Database Schema:

Quiz:
- id
- grade
- subject
- array of question ids - refrence to Question
- array of user response ids - refrence to User Response
- created at, updated at

Question
- id
- quiz_id - refrence to Quiz
- question
- array of options
- correct answer
- created at, updated at


User Response

- id
- quiz_id - refrence to Quiz
- Array of object -> {question_id, chosen_option}
- score
- created at, updated at



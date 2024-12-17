# Testing of Endpoints:

## 1. POST  - http://localhost:3000/login 

data to sent as request-body
{
  "username": "testUser",
  "password": "password123"
}

Response - you will recieve a JWT(Json Web Token)

## 2. POST - http://localhost:3000/create

data to sent as request-body
{
  "grade": 5,
  "subject": "History",
  "totalQue": 10,
  "maxScore": 10,
  "difficulty": "Hard"
}

Reponse you will get like

{
    "0": {
        "Question": "The Treaty of Versailles was signed in what year?",
        "Option": [
            "1915",
            "1918",
            "1919",
            "1920"
        ]
    },
    "1": {
        "Question": "The ancient city of Pompeii was destroyed by the eruption of which volcano?",
        "Option": [
            "Mount Vesuvius",
            "Mount Etna",
            "Mount St. Helens",
            "Mount Olympus"
        ]
    },
    .....
}


## 3. POST - http://localhost:3000/submit

data to sent as request-body
{
  "quizId": "6741d800562cfbe2e2fdb259",
  "responses": [
    {
      "questionId": "6741d800562cfbe2e2fdb262",
      "selectedOption": "A"
    },
    {
      "questionId": "6741d800562cfbe2e2fdb260",
      "selectedOption": "A"
    },
    {
      "questionId": "6741d800562cfbe2e2fdb25e",
      "selectedOption": "A"
    }
  ]
}

Reponse you will get like

{
    "score": 3,
    "message": "User responses saved successfully."
}


## 4. POST - http://localhost:3000/history

data to sent as request-body
{
  "grade": 5,
  "subject": "History",
}

Reponse you will get like

{
    "success": true,
    "data": [
        {
            "quizId": "6741d800562cfbe2e2fdb259",
            "grade": 5,
            "subject": "History",
            "questions": [
                {
                    "Question": "The Treaty of Versailles was signed in what year?",
                    "Options": {
                        "optionA": "1915",
                        "optionB": "1918",
                        "optionC": "1919",
                        "optionD": "1920"
                    },
                    "Answer": "D"
                },
                {
                    "Question": "The ancient city of Pompeii was destroyed by the eruption of which volcano?",
                    "Options": {
                        "optionA": "Mount Vesuvius",
                        "optionB": "Mount Etna",
                        "optionC": "Mount St. Helens",
                        "optionD": "Mount Olympus"
                    },
                    "Answer": "A"
                },
                {
                    "Question": "The first permanent English settlement in North America was established in which year?",
                    "Options": {
                        "optionA": "1607",
                        "optionB": "1608",
                        "optionC": "1610",
                        "optionD": "1611"
                    },
                    "Answer": "A"
                },
                {
                    "Question": "The Mongols were founded by which leader?",
                    "Options": {
                        "optionA": "Genghis Khan",
                        "optionB": "Barbarossa",
                        "optionC": "Alexander the Great",
                        "optionD": "Cyrus the Great"
                    },
                    "Answer": "A"
                },
                {
                    "Question": "The Rosetta Stone was discovered in which year?",
                    "Options": {
                        "optionA": "1799",
                        "optionB": "1800",
                        "optionC": "1801",
                        "optionD": "1802"
                    },
                    "Answer": "A"
                },
                {
                    "Question": "The Roman Empire was divided into two parts by which emperor?",
                    "Options": {
                        "optionA": "Constantine the Great",
                        "optionB": "Julius Caesar",
                        "optionC": "Augustus",
                        "optionD": "Diocletian"
                    },
                    "Answer": "D"
                },
                {
                    "Question": "The first Apollo mission to land on the Moon was named after which mythological figure?",
                    "Options": {
                        "optionA": "Apollo",
                        "optionB": "Ares",
                        "optionC": "Mars",
                        "optionD": "Jupiter"
                    },
                    "Answer": "A"
                },
                {
                    "Question": "The Inca Empire was conquered by which Spanish conquistador?",
                    "Options": {
                        "optionA": "Francisco Pizarro",
                        "optionB": "Hernán Cortés",
                        "optionC": "Pedro de Valdivia",
                        "optionD": "Juan Sebastián Elcano"
                    },
                    "Answer": "A"
                },
                {
                    "Question": "The Bubonic Plague swept through Europe during which century?",
                    "Options": {
                        "optionA": "14th",
                        "optionB": "15th",
                        "optionC": "16th",
                        "optionD": "17th"
                    },
                    "Answer": "A"
                },
                {
                    "Question": "The Tiananmen Square protests took place in which year?",
                    "Options": {
                        "optionA": "1989",
                        "optionB": "1990",
                        "optionC": "1991",
                        "optionD": "1992"
                    },
                    "Answer": "A"
                }
            ],
            "createdAt": "2024-11-23T13:26:24.938Z",
        }
    ]
}

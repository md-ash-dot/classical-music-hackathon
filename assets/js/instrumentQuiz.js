let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let answerChecked = false; // To track if feedback is shown

// Audio files for feedback
const correctSound = new Audio('assets/audio/correctAnswer.mp3');  // Add path to correct answer sound
const incorrectSound = new Audio('assets/audio/wrongAnswer.mp3');  // Add path to incorrect answer sound

// Selectors for HTML elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.createElement('div'); // Feedback container for correct/incorrect answer
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');
const quizContainerEl = document.getElementById('quiz-container');
const pastScoresEl = document.createElement('div'); // Container for past scores

// Function to shuffle an array using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to select 10 random questions
function selectRandomQuestions() {
    const shuffledQuestions = shuffle(instrumentQuestions); // Shuffle all the questions
    selectedQuestions = shuffledQuestions.slice(0, 3); // Take the first 10
}

// Function to load the current question
function loadQuestion() {
    answerChecked = false; // Reset feedback check
    feedbackEl.innerHTML = ''; // Clear any previous feedback
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    // Display the question
    questionEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // Display the options
    optionsEl.innerHTML = ''; // Clear previous options
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="radio" name="option" id="option${index}" value="${option}" onclick="enableNext()">
            <label for="option${index}">${option}</label>
        `;
        optionsEl.appendChild(li);
    });

    // Disable the "Next" button until an option is selected
    nextBtn.disabled = true;
}

// Function to enable the "Next" button once an option is selected
function enableNext() {
    nextBtn.disabled = false;
}

// Function to check the answer and show feedback
function checkAnswer() {
    if (answerChecked) return; // Prevent checking the answer again
    answerChecked = true; // Mark the answer as checked
    
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    // Create feedback and play corresponding audio
    if (selectedOption === currentQuestion.answer) {
        score++;
        feedbackEl.innerHTML = `<p style="color: green;">Correct!</p>`;
        correctSound.play(); // Play correct answer sound
    } else {
        feedbackEl.innerHTML = `<p style="color: red;">Wrong! The correct answer was: ${currentQuestion.answer}</p>`;
        incorrectSound.play(); // Play incorrect answer sound
    }

    // Display the feedback
    optionsEl.appendChild(feedbackEl);
}

// Function to load the next question or end the quiz
function nextQuestion() {
    checkAnswer(); // Show feedback for the user's answer

    if (answerChecked) {
        currentQuestionIndex++; // Move to the next question after feedback is shown

        if (currentQuestionIndex < selectedQuestions.length) {
            setTimeout(() => { // Wait 2 seconds to show feedback before loading the next question
                loadQuestion(); // Load the next question
            }, 2000);
        } else {
            // If the last question was just answered, show feedback and then end the quiz
            setTimeout(() => {
                endQuiz(); // End the quiz after feedback is shown
            }, 2000);
        }
    }
}

// Function to save the score to localStorage
function saveScoreToLocal() {
    const currentScores = getScoresFromLocal();
    currentScores.push(score); // Add the new score to the array
    localStorage.setItem('quizScores', JSON.stringify(currentScores)); // Save updated scores back to localStorage
}

// Function to retrieve scores from localStorage
function getScoresFromLocal() {
    const scores = localStorage.getItem('quizScores');
    return scores ? JSON.parse(scores) : []; // If no scores are stored, return an empty array
}

// Function to display past scores
function displayPastScores() {
    const pastScores = getScoresFromLocal();
    pastScoresEl.innerHTML = '<h3>Past Scores:</h3><ul>';
    
    if (pastScores.length === 0) {
        pastScoresEl.innerHTML += '<li>No previous scores.</li>';
    } else {
        pastScores.forEach((score, index) => {
            pastScoresEl.innerHTML += `<li>Game ${index + 1}: ${score}</li>`;
        });
    }

    pastScoresEl.innerHTML += '</ul>';
    resultEl.appendChild(pastScoresEl); // Add the past scores to the result section
}

// Function to end the quiz and display the score
function endQuiz() {
    // Hide the quiz container and show the result
    quizContainerEl.style.display = 'none';
    resultEl.style.display = 'block';

    // Display the final score
    scoreEl.innerText = `You scored ${score} out of ${selectedQuestions.length}`;

    // Save the current score to localStorage
    saveScoreToLocal();

    // Display past scores
    displayPastScores();
}

// Start the quiz: Select 3 random questions and load the first question
selectRandomQuestions(); // Select 3 random questions
loadQuestion(); // Load the first question
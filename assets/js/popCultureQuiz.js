let currentQuestionIndex = 0;
let score = 0;
let highestScore = localStorage.getItem('highScore') ? Number(localStorage.getItem('highScore')) : 0;
let selectedQuestions = [];
let answerChecked = false; // To track if feedback is shown

// Selectors for HTML elements
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById("play-audio-btn");
const optionsEl = document.getElementById('options');
const questionEl = document.getElementById('question');
const feedbackEl = document.getElementById('feedback');
const scoreFeedbackEl = document.getElementById('score-feedback');
const scoreEl = document.getElementById('final-score');
const highScoreEl = document.getElementById('high-score');
const nextBtn = document.getElementById('next-btn');
const quizContainerEl = document.getElementById('quiz-container');
const resultEl = document.getElementById('result');

// Audio files for feedback
const correctSound = new Audio('assets/audio/correctAnswer.mp3');
const incorrectSound = new Audio('assets/audio/wrongAnswer.mp3');

// Function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Select 10 random questions and shuffle the options within the questions
function selectRandomQuestions() {
    shuffleArray(popCultureQuestions); // Shuffle the entire popCultureQuestions array
    selectedQuestions = popCultureQuestions.slice(0, 10); // Limit to first 10 questions
}

// Load a question
function loadQuestion() {
    feedbackEl.innerText = ''; // Hide feedback
    answerChecked = false; // Reset feedback check

    // Load current question
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    // Display the question
    questionEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // Hide and reset the audio player
    audioPlayer.src = currentQuestion.audio;
    
    // Display the options
    optionsEl.innerHTML = ''; // Clear previous options
    currentQuestion.options.forEach((option, index) => {
        const optionId = `option${index}`; // Unique ID for each option

        // Create radio input element
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = optionId;
        input.name = 'quiz-option';
        input.value = option;
        input.onclick = enableNext; // Enable "Next" button when an option is clicked

        // Create label element
        const label = document.createElement('label');
        label.setAttribute('for', optionId);
        label.classList.add('option-button');
        label.innerText = option;

        // Append input and label to the options container
        optionsEl.appendChild(input);
        optionsEl.appendChild(label);
    });

    // Disable the "Next" button until an option is selected
    nextBtn.disabled = true;
}

// Function to enable the "Next" button once an option is selected
function enableNext() {
    nextBtn.disabled = false;
}

// Play audio function triggered by user
function playAudio() {
    audioPlayer.play().catch(error => console.error('Audio play failed: ', error));
}

// Function to check the answer and show feedback
function checkAnswer() {
    if (answerChecked) return; // Prevent checking the answer again
    answerChecked = true; // Mark the answer as checked
    
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked').value;
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    // Create feedback and play corresponding audio
    if (selectedOption === currentQuestion.answer) {
        score++;
        feedbackEl.innerHTML = `<p style="color: green;">Correct! Well done.</p>`;
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
        const optionButtons = document.querySelectorAll('input[name="quiz-option"]');
        optionButtons.forEach(button => {
            button.disabled = true; // Disable each radio button
        });
        currentQuestionIndex++; // Move to the next question after feedback is shown

        if (currentQuestionIndex < selectedQuestions.length) {
            setTimeout(() => { // Wait 2 seconds to show feedback before loading the next question
                loadQuestion(); // Load the next question
            }, 1000);
        } else {
            // If the last question was just answered, show feedback and then end the quiz
            setTimeout(() => {
                endQuiz(); // End the quiz after feedback is shown
            }, 1000);
        }
    }
}

// Store the highest score in localStorage if the current score is greater
function storeHighestScore() {
    const highestScore = localStorage.getItem('PopHighestScore') || 0;

    if (score > highestScore) {
        localStorage.setItem('PopHighestScore', score);
    }
}

// Display a result feedback based on the amount of correct answers
function displayScoreFeedback(score) {
    let message;
    
    if (score === 0) {
        message = "Oops! That one’s a blooper. Better luck next time!";
    } else if (score <= 4) {
        message = "Missed the beat, but the show goes on!";
    } else if (score <= 7) {
        message = "Close, but that score didn't quite hit the right note!";
    } else if (score <= 9) {
        message = "Almost had it! The silver screen awaits your comeback!";
    } else {
        message = "WOW! You're a melomaniac!";
    }
    
    scoreFeedbackEl.innerText = message; // Display the message in the HTML
}

// End of quiz: Display final score and high score
function endQuiz() {
    storeHighestScore(); 
    // Hide quiz interface
    quizContainerEl.style.display = 'none'; // Hide the quiz container

    // Update and display high score
    highestScore = localStorage.getItem('PopHighestScore');
    highestScore = highestScore ? highestScore : 0;

    // Display final score and the highest score
    scoreEl.innerText = `Your final score: ${score} out of ${selectedQuestions.length}`;
    highScoreEl.innerText = `Highest score: ${highestScore}`;
    resultEl.style.display = 'block';
    displayScoreFeedback(score);
}

// Start the quiz
window.onload = function() {
    selectRandomQuestions(); // Select random questions on page load
    loadQuestion();
}

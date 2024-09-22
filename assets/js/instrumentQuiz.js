let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let answerChecked = false; // To track if feedback is shown
let isMuted = false;

// Audio files for feedback
const correctSound = new Audio('assets/audio/correctAnswer.mp3');
const incorrectSound = new Audio('assets/audio/wrongAnswer.mp3');
const storedMuteState = localStorage.getItem('isMuted');

// Selectors for HTML elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const scoreFeedbackEl = document.getElementById('score-feedback');
const resultEl = document.getElementById('result');
const quizContainerEl = document.getElementById('quiz-container');
const pastScoresEl = document.getElementById('past-scores');
const muteBtn = document.getElementById('mute-btn');

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
    selectedQuestions = shuffledQuestions.slice(0, 10); // Take the first 10
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

    // Display the progress bar
    let progressBar = document.getElementsByClassName("progress");
    progressBar[currentQuestionIndex].classList.add("current-q");
}

// Function to enable the "Next" button once an option is selected
function enableNext() {
    nextBtn.disabled = false;
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
        if (!isMuted) {
            correctSound.play(); // Play correct answer sound
        }
    } else {
        feedbackEl.innerHTML = `<p style="color: red;">Wrong! The correct answer was: ${currentQuestion.answer}</p>`;
        if (!isMuted) {
            incorrectSound.play(); // Play incorrect answer sound
        }
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
            }, 2000);
        } else {
            // If the last question was just answered, show feedback and then end the quiz
            setTimeout(() => {
                endQuiz(); // End the quiz after feedback is shown
            }, 2000);
        }
    }
}

// Store the highest score in localStorage if the current score is greater
function storeHighestScore() {
    const highestScore = localStorage.getItem('InstrumentHighestScore') || 0;

    if (score > highestScore) {
        localStorage.setItem('InstrumentHighestScore', score);
    }
}

// Display a result feedback based on the amount of correct answers
function displayScoreFeedback(score) {
    let message;
    
    if (score === 0) {
        message = "Better luck next time! Keep practicing.";
    } else if (score <= 4) {
        message = "It might be too early to sign up for an orchestra.";
    } else if (score <= 7) {
        message = "Maybe join a garage band for some fun?";
    } else if (score <= 9) {
        message = "You're ready for a jam session! Keep honing those skills.";
    } else {
        message = "WOW! You're a melomaniac!";
    }
    
    scoreFeedbackEl.innerText = message; // Display the message in the HTML
}

// Function to end the quiz and display the score
function endQuiz() {
    storeHighestScore(); // Store the highest score if applicable
    quizContainerEl.style.display = 'none'; // Hide the quiz container
    resultEl.style.display = 'block'; // Show the result section

    // Display final score and the highest score
    highestScore = localStorage.getItem('InstrumentHighestScore');
    highestScore = highestScore ? highestScore : 0; // to avoid displaying null
    scoreEl.innerHTML = `${score} out of ${selectedQuestions.length}`;
    pastScoresEl.innerHTML = `Highest Score: ${highestScore}`;
    displayScoreFeedback(score);
}

// Toggle function to turn the audio on and off
function toggleMute() {
    if (isMuted) {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-off"></i><br>Sound On'
    } else { 
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i><br>Sound Off'
    }
}

// Check localStorage for existing mute state
function checkMuteState() {
    if (storedMuteState !== null) {
        isMuted = JSON.parse(storedMuteState); // Convert string to boolean
    }
    toggleMute(); // Update the sound and button based on the mute state
}

// Start the quiz: Select 10 random questions and load the first question
// Initialize the quiz
selectRandomQuestions();
loadQuestion();
checkMuteState();

nextBtn.addEventListener('click', nextQuestion);
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted); // Store mute state in localStorage
    toggleMute();
});
// muteBtn.addEventListener('click', toggleMute);
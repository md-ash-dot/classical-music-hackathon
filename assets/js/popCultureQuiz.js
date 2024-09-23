let currentQuestionIndex = 0;
let score = 0;
let highestScore = localStorage.getItem('highScore') ? Number(localStorage.getItem('highScore')) : 0;
let selectedQuestions = [];
let answerChecked = false;
let isMuted = false;
let isUpdating = false;

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
const muteBtn = document.getElementById('mute-btn');

// Audio files for feedback
const correctSound = new Audio('assets/audio/correctAnswer.mp3');
const incorrectSound = new Audio('assets/audio/wrongAnswer.mp3');
const storedMuteState = localStorage.getItem('isMuted');

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
    feedbackEl.innerText = '';
    answerChecked = false;

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    audioPlayer.src = currentQuestion.audio;
    
    optionsEl.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionId = `option${index}`;

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = optionId;
        input.name = 'quiz-option';
        input.value = option;
        input.onclick = enableNext;

        const label = document.createElement('label');
        label.setAttribute('for', optionId);
        label.classList.add('option-button');
        label.innerText = option;

        optionsEl.appendChild(input);
        optionsEl.appendChild(label);
    });

    nextBtn.disabled = true;

    // Update progress bar
    updateProgressBar();
}

// Add a new function to update the progress bar
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progressItems = progressBar.querySelectorAll('.progress');
    
    progressItems.forEach((item, index) => {
        if (index < currentQuestionIndex) {
            item.classList.add('answered');
            item.classList.remove('current-q', 'unanswered');
        } else if (index === currentQuestionIndex) {
            item.classList.add('current-q');
            item.classList.remove('answered', 'unanswered');
        } else {
            item.classList.add('unanswered');
            item.classList.remove('answered', 'current-q');
        }
    });
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
    if (answerChecked) return; // Prevent checking if already checked
    answerChecked = true;
    
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked').value;
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
        score++;
        feedbackEl.innerHTML = `<p style="color: green;">Correct! Well done.</p>`;
        if (!isMuted) {
            correctSound.play();
        }
    } else {
        feedbackEl.innerHTML = `<p style="color: red;">Wrong! The correct answer was: ${currentQuestion.answer}</p>`;
        if (!isMuted) {
            incorrectSound.play();
        }
    }
    optionsEl.appendChild(feedbackEl);

    // Update progress bar color based on the answer
    const progressItem = document.querySelector(`.progress:nth-child(${currentQuestionIndex + 1})`);
    progressItem.classList.add(isCorrect ? 'correct' : 'incorrect');

    // Disable the next button to prevent spam clicks
    nextBtn.disabled = true;
}


// Function to load the next question or end the quiz
function nextQuestion() {
    if (isUpdating) return; // Prevent multiple calls while updating
    isUpdating = true; // Set updating flag at the start

    if (!answerChecked) {
        checkAnswer();
    }

    const optionButtons = document.querySelectorAll('input[name="quiz-option"]');
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuestions.length) {
        setTimeout(() => {
            answerChecked = false; // Reset answer check for new question
            loadQuestion();
            isUpdating = false; // Reset the updating flag
            nextBtn.disabled = true; // Disable next button until new answer is chosen
        }, 2000);
    } else {
        setTimeout(() => {
            endQuiz();
            isUpdating = false; // Reset the updating flag
        }, 2000);
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

// Toggle function to turn the audio on and off
function toggleMute() {
    if (isMuted) {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-off"></i>'
    } else { 
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'
    }
}

// Check localStorage for existing mute state
function checkMuteState() {
    if (storedMuteState !== null) {
        isMuted = JSON.parse(storedMuteState); // Convert string to boolean
    }
    toggleMute(); // Update the sound and button based on the mute state
}

nextBtn.addEventListener('click', () => {
    if (!isUpdating) {
        nextQuestion();
    }
});

// Start the quiz
selectRandomQuestions();
loadQuestion();
checkMuteState();

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    toggleMute();
});

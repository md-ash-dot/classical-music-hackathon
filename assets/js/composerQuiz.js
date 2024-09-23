let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let answerChecked = false;
let hintUsed = false;
let isMuted = false;
let isUpdating = false;

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
const hintBtn = document.getElementById('hint-btn');
const hintEl = document.getElementById('hint');
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
    const shuffledQuestions = shuffle(composerQuestions);
    selectedQuestions = shuffledQuestions.slice(0, 10);
}

// Function to load the current question
function loadQuestion() {
    answerChecked = false;
    hintUsed = false;
    feedbackEl.innerHTML = '';
    hintEl.innerHTML = '';
    hintBtn.style.display = 'inline-block';
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    questionEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
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

// New function to update the progress bar
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

function enableNext() {
    nextBtn.disabled = false;
}

function showHint() {
    if (!hintUsed) {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        hintEl.innerHTML = `<p class="hint-text"><strong>Hint:</strong> ${currentQuestion.hint}</p>`;
        hintUsed = true;
        hintBtn.style.display = 'none';
    }
}

function checkAnswer() {
    if (answerChecked) return;
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

    nextBtn.disabled = true;
}

function nextQuestion() {
    if (isUpdating) return;
    isUpdating = true;

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
            answerChecked = false;
            loadQuestion();
            isUpdating = false;
            nextBtn.disabled = true;
        }, 2000);
    } else {
        setTimeout(() => {
            endQuiz();
            isUpdating = false;
        }, 2000);
    }
}

function storeHighestScore() {
    const highestScore = localStorage.getItem('composerHighestScore') || 0;

    if (score > highestScore) {
        localStorage.setItem('composerHighestScore', score);
    }
}

function displayScoreFeedback(score) {
    let message;
    
    if (score === 0) {
        message = "Don't worry, even Mozart had to start somewhere!";
    } else if (score <= 4) {
        message = "You're warming up! Keep exploring the world of composers.";
    } else if (score <= 7) {
        message = "You're composing your way to success! Keep it up!";
    } else if (score <= 9) {
        message = "Bravo! You're almost ready to conduct your own orchestra!";
    } else {
        message = "Maestro! Your knowledge of composers is truly legendary! You're a melomaniac!";
    }
    
    scoreFeedbackEl.innerText = message;
}

function endQuiz() {
    storeHighestScore();
    quizContainerEl.style.display = 'none';
    resultEl.style.display = 'block';

    const highestScore = localStorage.getItem('composerHighestScore') || 0;
    scoreEl.innerHTML = `${score} out of ${selectedQuestions.length}`;
    pastScoresEl.innerHTML = `Highest Score: ${highestScore}`;
    displayScoreFeedback(score);
}

function toggleMute() {
    if (isMuted) {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-off"></i>';
    } else { 
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
}

function checkMuteState() {
    if (storedMuteState !== null) {
        isMuted = JSON.parse(storedMuteState);
    }
    toggleMute();
}

selectRandomQuestions();
loadQuestion();
checkMuteState();

nextBtn.addEventListener('click', () => {
    if (!isUpdating) {
        nextQuestion();
    }
});

hintBtn.addEventListener('click', showHint);

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    toggleMute();
});

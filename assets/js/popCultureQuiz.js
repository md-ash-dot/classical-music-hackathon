let currentQuestionIndex = 0;
let score = 0;
let highestScore = localStorage.getItem('highScore') ? Number(localStorage.getItem('highScore')) : 0;
let selectedQuestions = [];

// Function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Select 3 random questions and shuffle the options within the questions
function selectRandomQuestions() {
    shuffleArray(popCultureQuestions); // Shuffle the entire popCultureQuestions array
    selectedQuestions = popCultureQuestions.slice(0, 3); // Limit to first 3 questions
}

// Load a question
function loadQuestion() {
    // Hide feedback
    document.getElementById('feedback').innerText = '';

    // Load current question
    const questionData = selectedQuestions[currentQuestionIndex]; // Use the random selected questions
    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1}`;
    
    // Hide and reset the audio player
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = questionData.audio;
    
    // Display options
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Clear previous options
    questionData.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" name="quiz-option" value="${option}">
            <label>${option}</label>
        `;
        optionsDiv.appendChild(optionElement);
    });
}

// Play audio function triggered by user
function playAudio() {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.play().catch(error => console.error('Audio play failed: ', error));
}

// Move to the next question and check the answer
function nextQuestion() {
    // Check if an option is selected
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    const answer = selectedOption.value;
    const questionData = selectedQuestions[currentQuestionIndex];

    // Provide feedback
    const feedbackElement = document.getElementById('feedback');
    if (answer === questionData.answer) {
        feedbackElement.innerText = "Correct!";
        score++;
    } else {
        feedbackElement.innerText = `Wrong! The correct answer is: ${questionData.answer}`;
    }

    // Move to the next question after showing feedback
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        currentQuestionIndex++;
        setTimeout(loadQuestion, 2000); // Delay to allow feedback to show before next question
    } else {
        endQuiz();
    }
}

// End of quiz: Display final score and high score
function endQuiz() {
    document.getElementById('final-score').innerText = `Your final score: ${score}/${selectedQuestions.length}`;
    document.getElementById('final-score').style.display = 'block';

    // Update and display high score
    if (score > highestScore) {
        highestScore = score;
        localStorage.setItem('highScore', highestScore);
    }
    document.getElementById('high-score').innerText = `Highest score: ${highestScore}`;
    document.getElementById('high-score').style.display = 'block';

    // Hide quiz interface
    document.getElementById('question-number').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
}

// Start the quiz
window.onload = function() {
    selectRandomQuestions(); // Select random questions on page load
    loadQuestion();
}

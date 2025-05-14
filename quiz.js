// Typing animation
function typeWord() {
    const element = document.getElementById('animated-name');
    const cursor = document.querySelector('.typing-cursor');
    const text = "quiz";
    element.textContent = ''; // Clear initial text
    
    let index = 0;
    cursor.style.opacity = '1';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            cursor.classList.add('visible');
        }
    }
    
    type();
}

window.addEventListener('load', typeWord);

// Quiz data and logic
const topics = {
    chemistry: [
        { question: "What is the chemical formula for water?", answers: ["H2O", "CO2", "NaCl", "O2"], correct: 0 },
        { question: "What is the atomic number of Carbon?", answers: ["6", "8", "12", "14"], correct: 0 },
        { question: "What is the pH of a neutral solution?", answers: ["0", "7", "14", "10"], correct: 1 },
    ],
    biology: [
        { question: "What is the powerhouse of the cell?", answers: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"], correct: 1 },
        { question: "What type of biological molecule are enzymes?", answers: ["Proteins", "Lipids", "Carbohydrates", "Nucleotides"], correct: 0 },
        { question: "Which organ is responsible for pumping blood?", answers: ["Liver", "Lungs", "Heart", "Kidneys"], correct: 2 },
    ],
    physics: [
        { question: "What is the speed of light in a vacuum?", answers: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "100 km/s"], correct: 0 },
        { question: "What is the unit of force?", answers: ["Joule", "Newton", "Pascal", "Watt"], correct: 1 },
        { question: "What is the acceleration due to gravity on Earth?", answers: ["9.8 m/s²", "10 m/s²", "5 m/s²", "20 m/s²"], correct: 0 },
    ],
};

let selectedTopics = [];
let quizQuestions = [];
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 10; // 10 seconds per question
let ddaakPoints = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timedOutQuestions = 0;
let answered = false;

const topicCards = document.querySelectorAll(".nav-card");
const startQuizBtn = document.getElementById("start-quiz-btn");
const quizContainer = document.getElementById("quiz-container");
const topicSelection = document.getElementById("topic-selection");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const questionNumberElement = document.getElementById("question-number");
const totalQuestionsElement = document.getElementById("total-questions");
const scoreElement = document.getElementById("score");
const resultsContainer = document.getElementById("results-container");
const finalScoreElement = document.getElementById("final-score");
const possibleScoreElement = document.getElementById("possible-score");
const restartBtn = document.getElementById("restart-btn");

// Topic selection logic
topicCards.forEach(card => {
    card.addEventListener("click", () => {
        const topic = card.getAttribute("data-topic");
        
        if (card.classList.contains("selected")) {
            // Deselect topic
            card.classList.remove("selected");
            selectedTopics = selectedTopics.filter(t => t !== topic);
        } else {
            // Select topic
            card.classList.add("selected");
            selectedTopics.push(topic);
        }
        
        // Enable or disable start button based on selection
        startQuizBtn.disabled = selectedTopics.length === 0;
    });
});

// Start quiz button
startQuizBtn.addEventListener("click", startQuiz);

function startQuiz() {
    // Create quiz questions by combining selected topics
    quizQuestions = [];
    selectedTopics.forEach(topic => {
        topics[topic].forEach(question => {
            quizQuestions.push({
                ...question,
                topic: topic // Add topic information to track where question came from
            });
        });
    });
    
    // Shuffle questions for more variety
    shuffleArray(quizQuestions);
    
    // Reset quiz state
    currentQuestionIndex = 0;
    ddaakPoints = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timedOutQuestions = 0;
    scoreElement.textContent = ddaakPoints;
    
    // Update UI
    topicSelection.style.display = "none";
    quizContainer.style.display = "block";
    resultsContainer.style.display = "none";
    
    totalQuestionsElement.textContent = quizQuestions.length;
    questionNumberElement.textContent = currentQuestionIndex + 1;
    
    showQuestion();
    startTimer();
}

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    answered = false;
    
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    feedbackElement.className = "";
    questionNumberElement.textContent = currentQuestionIndex + 1;
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(index));
        answersElement.appendChild(button);
    });
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;
    
    clearInterval(timerInterval);
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === currentQuestion.correct) {
            btn.classList.add("correct");
        } else if (i === index) {
            btn.classList.add("incorrect");
        }
    });

    if (index === currentQuestion.correct) {
        feedbackElement.innerHTML = `Correct! <span class="ddaak-badge">+10 DDAK</span>`;
        feedbackElement.className = "feedback-correct";
        ddaakPoints += 10;
        correctAnswers++;
    } else {
        feedbackElement.innerHTML = `Incorrect! <span class="ddaak-badge">0 DDAK</span><br>The correct answer is: ${currentQuestion.answers[currentQuestion.correct]}`;
        feedbackElement.className = "feedback-incorrect";
        wrongAnswers++;
    }

    scoreElement.textContent = ddaakPoints;
    
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        setTimeout(() => {
            timeLeft = 10; 
            startTimer();
            showQuestion();
        }, 2000);
    } else {
        setTimeout(showResults, 2000);
    }
}

function timeUp() {
    if (answered) return;
    answered = true;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    feedbackElement.innerHTML = `Time's up! <span class="ddaak-badge">0 DDAK</span><br>The correct answer is: ${currentQuestion.answers[currentQuestion.correct]}`;
    feedbackElement.className = "feedback-incorrect";
    
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === currentQuestion.correct) {
            btn.classList.add("correct");
        }
    });
    
    wrongAnswers++;
    timedOutQuestions++;
    
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        setTimeout(() => {
            timeLeft = 10; 
            startTimer();
            showQuestion();
        }, 2000);
    } else {
        setTimeout(showResults, 2000);
    }
}

function startTimer() {
    timeLeft = 10;
    progressBar.style.width = "100%";
    progressBar.className = "";
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft -= 0.1;
        progressBar.style.width = `${(timeLeft / 10) * 100}%`;
        
        if (timeLeft <= 5) {
            progressBar.className = "warning";
        }
        
        if (timeLeft <= 2) {
            progressBar.className = "danger";
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 100);
}

function showResults() {
    quizContainer.style.display = "none";
    resultsContainer.style.display = "block";
    
    finalScoreElement.textContent = ddaakPoints;
    possibleScoreElement.textContent = quizQuestions.length * 10;
    
    // Update statistics
    document.getElementById("ddaak-points").textContent = ddaakPoints;
    document.getElementById("correct-answers").textContent = correctAnswers;
    document.getElementById("total-questions").textContent = quizQuestions.length;
    document.getElementById("wrong-answers").textContent = wrongAnswers;
    document.getElementById("timed-out").textContent = timedOutQuestions;
    
    const accuracy = ((correctAnswers / quizQuestions.length) * 100).toFixed(1);
    const averageTimePerQuestion = (timeLeft / quizQuestions.length).toFixed(1);
    
    document.getElementById("accuracy").textContent = accuracy;
    document.getElementById("avg-time").textContent = averageTimePerQuestion;
}

restartBtn.addEventListener("click", () => {
    resultsContainer.style.display = "none";
    topicSelection.style.display = "block";
    
    // Reset topic selections
    topicCards.forEach(card => {
        card.classList.remove("selected");
    });
    selectedTopics = [];
    startQuizBtn.disabled = true;
});

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

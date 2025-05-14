document.addEventListener('DOMContentLoaded', function() {
  // Enhanced game data with explanations and difficulty
  const questions = {
    physics: [
      {
        question: "Quelle est la première loi du mouvement de Newton ?",
        answer: "Un objet restera au repos ou en mouvement uniforme en ligne droite à moins qu'une force extérieure n'agisse sur lui.",
        wrongAnswers: [
          "La force est égale à la masse multipliée par l'accélération",
          "Pour chaque action, il y a une réaction égale et opposée",
          "L'énergie ne peut être ni créée ni détruite"
        ],
        explanation: "C'est le principe d'inertie qui décrit le comportement des objets sans force nette.",
        difficulty: 1
      },
      {
        question: "Quelle est l'unité de la résistance électrique ?",
        answer: "Ohm (Ω)",
        wrongAnswers: ["Volt (V)", "Ampère (A)", "Watt (W)"],
        explanation: "La résistance, qui s'oppose au courant, se mesure en Ohms.",
        difficulty: 1
      },
      // 28 more physics questions...
      {
        question: "Quel principe décrit la dualité onde-particule ?",
        answer: "Le principe de complémentarité de Bohr",
        wrongAnswers: [
          "Le principe d'incertitude de Heisenberg",
          "Le principe de Pauli",
          "Le principe de relativité"
        ],
        explanation: "Bohr a proposé que les objets quantiques peuvent se comporter comme des particules ou des ondes selon le contexte expérimental.",
        difficulty: 3
      }
    ],
    chemistry: [
      {
        question: "Qu'est-ce qu'un atome ?",
        answer: "L'unité la plus petite de la matière qui conserve les propriétés d'un élément.",
        wrongAnswers: [
          "Une molécule d'eau",
          "Un type de liaison chimique",
          "Une particule subatomique"
        ],
        explanation: "Les atomes sont les blocs de construction de base de la matière ordinaire.",
        difficulty: 1
      },
      {
        question: "Quel est le pH d'une solution neutre à 25°C ?",
        answer: "7",
        wrongAnswers: ["0", "14", "1"],
        explanation: "Le pH est une échelle logarithmique où 7 représente la neutralité (concentration égale en H+ et OH-).",
        difficulty: 1
      },
      // 28 more chemistry questions...
      {
        question: "Quel est l'élément avec la configuration électronique [Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³ ?",
        answer: "Bismuth (Bi)",
        wrongAnswers: ["Plomb (Pb)", "Polonium (Po)", "Thallium (Tl)"],
        explanation: "Cette configuration correspond au numéro atomique 83, qui est le bismuth.",
        difficulty: 3
      }
    ],
    biology: [
      {
        question: "Qu'est-ce que la respiration cellulaire ?",
        answer: "Le processus par lequel les cellules convertissent le glucose en énergie (ATP).",
        wrongAnswers: [
          "Le processus de division cellulaire",
          "L'échange de gaz dans les poumons",
          "La production de protéines"
        ],
        explanation: "La respiration cellulaire comprend la glycolyse, le cycle de Krebs et la chaîne de transport d'électrons.",
        difficulty: 2
      },
      {
        question: "Quel organelle est responsable de la synthèse des protéines ?",
        answer: "Le ribosome",
        wrongAnswers: ["Le noyau", "L'appareil de Golgi", "Le réticulum endoplasmique lisse"],
        explanation: "Les ribosomes, composés d'ARNr et de protéines, sont les sites de traduction de l'ARNm en protéines.",
        difficulty: 1
      },
      // 28 more biology questions...
      {
        question: "Quel mécanisme explique l'évolution des espèces par sélection de traits avantageux ?",
        answer: "La sélection naturelle",
        wrongAnswers: [
          "La dérive génétique",
          "Le flux génique",
          "La mutation aléatoire"
        ],
        explanation: "Proposée par Darwin, la sélection naturelle favorise les traits qui améliorent la survie et la reproduction.",
        difficulty: 2
      }
    ]
  };

  // Enhanced game state
  const state = {
    selectedTopics: [],
    currentQuestions: [],
    currentQuestionIndex: 0,
    score: 0,
    timer: null,
    timeLeft: 15,
    difficulty: 'medium', // easy/medium/hard
    answeredQuestions: [],
    gameInProgress: false
  };

  // DOM elements
  const elements = {
    topicCards: document.querySelectorAll('.topic-card'),
    startBtn: document.getElementById('start-btn'),
    topicSelection: document.getElementById('topic-selection'),
    questionContainer: document.getElementById('question-container'),
    questionText: document.getElementById('question-text'),
    optionsGrid: document.getElementById('options-grid'),
    timerBar: document.getElementById('timer-bar'),
    scoreDisplay: document.getElementById('score'),
    progressDisplay: document.createElement('div'),
    difficultySelector: document.createElement('select'),
    feedbackDisplay: document.createElement('div')
  };

  // Initialize UI enhancements
  function initUI() {
    // Add progress display
    elements.progressDisplay.className = 'progress-display';
    elements.questionContainer.insertBefore(elements.progressDisplay, elements.questionText);
    
    // Add difficulty selector
    const difficultyLabel = document.createElement('label');
    difficultyLabel.textContent = 'Difficulté: ';
    difficultyLabel.htmlFor = 'difficulty-selector';
    elements.difficultySelector.id = 'difficulty-selector';
    ['Facile', 'Moyen', 'Difficile'].forEach((text, index) => {
      const option = document.createElement('option');
      option.value = ['easy', 'medium', 'hard'][index];
      option.textContent = text;
      elements.difficultySelector.appendChild(option);
    });
    elements.difficultySelector.value = 'medium';
    elements.topicSelection.insertBefore(difficultyLabel, elements.startBtn);
    elements.topicSelection.insertBefore(elements.difficultySelector, elements.startBtn);
    
    // Add feedback display
    elements.feedbackDisplay.className = 'feedback-display';
    elements.questionContainer.appendChild(elements.feedbackDisplay);
    
    // Load saved state
    loadGameState();
  }

  // Event listeners
  elements.topicCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const topic = card.dataset.topic;
      
      if (card.classList.contains('selected')) {
        state.selectedTopics.push(topic);
      } else {
        state.selectedTopics = state.selectedTopics.filter(t => t !== topic);
      }
      saveGameState();
    });
  });

  elements.startBtn.addEventListener('click', startGame);
  elements.difficultySelector.addEventListener('change', (e) => {
    state.difficulty = e.target.value;
    saveGameState();
  });

  // Game functions
  function startGame() {
    if (state.selectedTopics.length === 0) {
      alert('Veuillez sélectionner au moins une matière');
      return;
    }

    // Prepare questions based on difficulty
    state.currentQuestions = [];
    state.selectedTopics.forEach(topic => {
      if (questions[topic]) {
        // Filter questions by difficulty
        const filteredQuestions = questions[topic].filter(q => {
          if (state.difficulty === 'easy') return q.difficulty <= 1;
          if (state.difficulty === 'medium') return q.difficulty <= 2;
          return true; // hard - all questions
        });
        state.currentQuestions.push(...filteredQuestions);
      }
    });
    
    shuffleArray(state.currentQuestions);
    state.currentQuestions = state.currentQuestions.slice(0, 15); // Fixed 15 questions per game
    
    if (state.currentQuestions.length === 0) {
      alert('Aucune question disponible pour les critères sélectionnés');
      return;
    }

    // Initialize game
    state.score = 0;
    state.currentQuestionIndex = 0;
    state.answeredQuestions = [];
    state.gameInProgress = true;
    updateScore();
    updateProgress();
    
    // Show first question
    elements.topicSelection.style.display = 'none';
    elements.questionContainer.style.display = 'block';
    showQuestion();
    saveGameState();
  }

  function showQuestion() {
    if (state.currentQuestionIndex >= state.currentQuestions.length) {
      endGame();
      return;
    }

    const question = state.currentQuestions[state.currentQuestionIndex];
    elements.questionText.textContent = question.question;
    elements.feedbackDisplay.textContent = '';
    
    // Clear previous options
    elements.optionsGrid.innerHTML = '';
    
    // Prepare answer options
    const options = [
      { text: question.answer, correct: true },
      ...question.wrongAnswers.map(text => ({ text, correct: false }))
    ];
    
    shuffleArray(options);
    
    // Create option buttons
    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.textContent = option.text;
      button.dataset.correct = option.correct;
      
      button.addEventListener('click', () => handleAnswer(button, option.correct));
      elements.optionsGrid.appendChild(button);
    });
    
    // Set timer based on difficulty
    const baseTime = 15;
    let timeLimit = baseTime;
    if (state.difficulty === 'easy') timeLimit = Math.ceil(baseTime * 1.5);
    if (state.difficulty === 'hard') timeLimit = Math.ceil(baseTime * 0.7);
    
    state.timeLeft = timeLimit;
    updateTimer();
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      state.timeLeft--;
      updateTimer();
      
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        handleTimeOut();
      }
    }, 1000);
  }

  function handleAnswer(button, isCorrect) {
    clearInterval(state.timer);
    
    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
    });
    
    // Mark correct/incorrect
    button.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Show correct answer if wrong
    if (!isCorrect) {
      const correctBtn = document.querySelector('.option-btn[data-correct="true"]');
      correctBtn.classList.add('correct');
    }
    
    // Calculate points
    const basePoints = isCorrect ? 100 : 0;
    const timeBonus = isCorrect ? Math.floor(state.timeLeft * 2) : 0;
    const difficultyMultiplier = {
      easy: 0.7,
      medium: 1,
      hard: 1.5
    }[state.difficulty];
    
    const points = Math.round((basePoints + timeBonus) * difficultyMultiplier);
    state.score += points;
    updateScore();
    
    // Store answered question for review
    state.answeredQuestions.push({
      question: state.currentQuestions[state.currentQuestionIndex],
      userAnswer: button.textContent,
      isCorrect,
      timeSpent: 15 - state.timeLeft,
      pointsEarned: points
    });
    
    // Show explanation
    elements.feedbackDisplay.textContent = 
      state.currentQuestions[state.currentQuestionIndex].explanation || 
      (isCorrect ? "Bonne réponse!" : "Mauvaise réponse.");
    
    // Next question after delay
    setTimeout(() => {
      state.currentQuestionIndex++;
      updateProgress();
      saveGameState();
      showQuestion();
    }, 2500);
  }

  function handleTimeOut() {
    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
    });
    
    // Mark correct answer
    const correctBtn = document.querySelector('.option-btn[data-correct="true"]');
    correctBtn.classList.add('correct');
    
    // Store unanswered question
    state.answeredQuestions.push({
      question: state.currentQuestions[state.currentQuestionIndex],
      userAnswer: null,
      isCorrect: false,
      timeSpent: 15,
      pointsEarned: 0
    });
    
    // Show feedback
    elements.feedbackDisplay.textContent = "Temps écoulé! " + 
      (state.currentQuestions[state.currentQuestionIndex].explanation || "");
    
    // Next question after delay
    setTimeout(() => {
      state.currentQuestionIndex++;
      updateProgress();
      saveGameState();
      showQuestion();
    }, 2500);
  }

  function updateTimer() {
    const percentage = (state.timeLeft / 15) * 100;
    elements.timerBar.style.width = `${percentage}%`;
    
    // Change color based on time left
    if (percentage < 20) {
      elements.timerBar.style.backgroundColor = '#F44336'; // red
    } else if (percentage < 50) {
      elements.timerBar.style.backgroundColor = '#FF9800'; // orange
    } else {
      elements.timerBar.style.backgroundColor = '#4CAF50'; // green
    }
  }

  function updateScore() {
    elements.scoreDisplay.textContent = state.score;
  }

  function updateProgress() {
    elements.progressDisplay.textContent = 
      `Question ${state.currentQuestionIndex + 1} sur ${state.currentQuestions.length}`;
  }

  function endGame() {
    state.gameInProgress = false;
    saveGameState();
    
    // Calculate performance
    const correctCount = state.answeredQuestions.filter(q => q.isCorrect).length;
    const percentage = Math.round((correctCount / state.answeredQuestions.length) * 100);
    const averageTime = Math.round(
      state.answeredQuestions.reduce((sum, q) => sum + q.timeSpent, 0) / 
      state.answeredQuestions.length
    );
    
    // Show detailed results
    let resultHTML = `
      <h2>Résultats du Quiz</h2>
      <p>Score final: <strong>${state.score} XP</strong></p>
      <p>Réponses correctes: <strong>${correctCount}/${state.answeredQuestions.length}</strong> (${percentage}%)</p>
      <p>Temps moyen par question: <strong>${averageTime}s</strong></p>
      <h3>Détail des questions:</h3>
      <ul class="question-review">
    `;
    
    state.answeredQuestions.forEach((q, index) => {
      resultHTML += `
        <li class="${q.isCorrect ? 'correct' : 'incorrect'}">
          <strong>Question ${index + 1}:</strong> ${q.question.question}<br>
          Votre réponse: ${q.userAnswer || 'Aucune'}<br>
          ${q.isCorrect ? 
            `✓ Correct (+${q.pointsEarned} pts)` : 
            `✗ Incorrect (Réponse: ${q.question.answer})`}<br>
          <em>${q.question.explanation}</em>
        </li>
      `;
    });
    
    resultHTML += `</ul><button id="restart-btn" class="btn">Recommencer</button>`;
    
    elements.questionContainer.innerHTML = resultHTML;
    document.getElementById('restart-btn').addEventListener('click', () => {
      location.reload(); // Simple restart for now
    });
  }

  // Utility functions
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function saveGameState() {
    sessionStorage.setItem('quizGameState', JSON.stringify({
      selectedTopics: state.selectedTopics,
      difficulty: state.difficulty,
      gameInProgress: state.gameInProgress,
      score: state.score,
      currentQuestions: state.gameInProgress ? state.currentQuestions : [],
      currentQuestionIndex: state.currentQuestionIndex,
      answeredQuestions: state.answeredQuestions
    }));
  }

  function loadGameState() {
    const savedState = sessionStorage.getItem('quizGameState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      Object.assign(state, parsed);
      
      // Restore UI state
      elements.difficultySelector.value = state.difficulty;
      state.selectedTopics.forEach(topic => {
        document.querySelector(`.topic-card[data-topic="${topic}"]`).classList.add('selected');
      });
      
      if (state.gameInProgress) {
        elements.startBtn.textContent = 'Continuer';
      }
    }
  }

  // Initialize the game
  initUI();
});

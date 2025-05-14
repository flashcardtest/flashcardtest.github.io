
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
    chemistry: [{
            question: "Quelle est la formule chimique de l'eau ?",
            answers: ["H2O", "CO2", "NaCl", "O2"],
            correct: 0
        },
        {
            question: "Quel est le numéro atomique du carbone ?",
            answers: ["6", "8", "12", "14"],
            correct: 0
        },
        {
            question: "Quel est le pH d'une solution neutre ?",
            answers: ["0", "7", "14", "10"],
            correct: 1
        },
        {
            question: "Quel gaz est produit lors de la photosynthèse ?",
            answers: ["CO2", "O2", "N2", "H2"],
            correct: 1
        },
        {
            question: "Quelle est la charge d'un proton ?",
            answers: ["+1", "-1", "0", "+2"],
            correct: 0
        },
        {
            question: "Quel élément est représenté par le symbole 'Au' ?",
            answers: ["Argent", "Aluminium", "Or", "Arsenic"],
            correct: 2
        },
        {
            question: "Qu'est-ce qu'un alcane ?",
            answers: ["Un hydrocarbure saturé", "Un acide carboxylique", "Un alcool", "Une cétone"],
            correct: 0
        },
        {
            question: "Quelle est la masse molaire du H2SO4 (acide sulfurique) ?",
            answers: ["49 g/mol", "98 g/mol", "64 g/mol", "32 g/mol"],
            correct: 1
        },
        {
            question: "Quelle est la configuration électronique de l'oxygène (Z=8) ?",
            answers: ["1s² 2s² 2p⁴", "1s² 2s² 2p⁶", "1s² 2s² 2p²", "1s² 2s² 2p⁵"],
            correct: 0
        },
        {
            question: "Quelle est l'équation de la réaction entre HCl et NaOH ?",
            answers: ["HCl + NaOH → NaCl + H2O", "HCl + NaOH → NaH + ClOH", "HCl + NaOH → H2 + NaClO", "HCl + NaOH → NaOH2 + Cl"],
            correct: 0
        },
        {
            question: "Qu'est-ce qu'un catalyseur ?",
            answers: ["Une substance qui ralentit une réaction", "Une substance consommée dans une réaction", "Une substance qui accélère une réaction sans être consommée", "Un produit de réaction"],
            correct: 2
        },
        {
            question: "Quel type de liaison est présent dans NaCl ?",
            answers: ["Covalente", "Ionique", "Métallique", "Hydrogène"],
            correct: 1
        },
        {
            question: "Quel est le gaz responsable de l'effet de serre ?",
            answers: ["O2", "N2", "CO2", "H2"],
            correct: 2
        },
        {
            question: "Qu'est-ce que la loi des gaz parfaits ?",
            answers: ["PV = nRT", "E = mc²", "F = ma", "V = IR"],
            correct: 0
        },
        {
            question: "Quel est l'élément le plus abondant dans l'atmosphère terrestre ?",
            answers: ["Oxygène", "Hydrogène", "Azote", "Carbone"],
            correct: 2
        },
        {
            question: "Quelle est la forme géométrique d'une molécule d'eau ?",
            answers: ["Linéaire", "Trigonal plan", "Tétraédrique", "Angulaire"],
            correct: 3
        },
        {
            question: "Qu'est-ce qu'un isomère ?",
            answers: ["Des atomes de même numéro atomique mais de masse différente", "Des molécules de même formule mais de structure différente", "Des ions de même charge", "Des isotopes stables"],
            correct: 1
        },
        {
            question: "Quel acide est présent dans le vinaigre ?",
            answers: ["Acide sulfurique", "Acide chlorhydrique", "Acide acétique", "Acide nitrique"],
            correct: 2
        },
        {
            question: "Quel est le principal composant du gaz naturel ?",
            answers: ["Méthane", "Éthane", "Propane", "Butane"],
            correct: 0
        },
        {
            question: "Quelle est l'unité de concentration en molarité ?",
            answers: ["g/L", "mol/L", "ppm", "%"],
            correct: 1
        },
        {
            question: "Quel métal est liquide à température ambiante ?",
            answers: ["Fer", "Mercure", "Aluminium", "Cuivre"],
            correct: 1
        },
        {
            question: "Qu'est-ce que la sublimation ?",
            answers: ["Passage de solide à liquide", "Passage de liquide à gaz", "Passage de solide à gaz", "Passage de gaz à solide"],
            correct: 2
        },
        {
            question: "Quel groupe fonctionnel caractérise un alcool ?",
            answers: ["-COOH", "-OH", "-CHO", "-NH2"],
            correct: 1
        },
        {
            question: "Quel est le nom de la réaction : 2H2 + O2 → 2H2O ?",
            answers: ["Neutralisation", "Combustion", "Précipitation", "Oxydoréduction"],
            correct: 1
        },
        {
            question: "Quel est le pH approximatif du jus de citron ?",
            answers: ["2", "7", "10", "14"],
            correct: 0
        },
        {
            question: "Quel est le principal gaz responsable de l'appauvrissement de la couche d'ozone ?",
            answers: ["CO2", "CH4", "CFC", "N2O"],
            correct: 2
        },
        {
            question: "Quelle particule subatomique a une charge négative ?",
            answers: ["Proton", "Neutron", "Électron", "Positron"],
            correct: 2
        },
        {
            question: "Quel est le nom de Na2CO3 ?",
            answers: ["Hydroxyde de sodium", "Chlorure de sodium", "Carbonate de sodium", "Nitrate de sodium"],
            correct: 2
        },
        {
            question: "Quelle est la couleur du sulfate de cuivre anhydre ?",
            answers: ["Bleu", "Vert", "Blanc", "Jaune"],
            correct: 2
        },
        {
            question: "Qu'est-ce qu'un polymère ?",
            answers: ["Une petite molécule", "Une macromolécule formée de motifs répétés", "Un ion complexe", "Un gaz noble"],
            correct: 1
        },
        {
            question: "Quel est le nom de la réaction : Fe + CuSO4 → FeSO4 + Cu ?",
            answers: ["Précipitation", "Double déplacement", "Oxydoréduction", "Estérification"],
            correct: 2
        },
        {
            question: "Quel est le principal composant du diamant ?",
            answers: ["Fer", "Carbone", "Silice", "Calcium"],
            correct: 1
        },
        {
            question: "Quel est le produit de la réaction entre un acide et une base ?",
            answers: ["Un ester", "Un alcool", "Un sel et de l'eau", "Un aldéhyde"],
            correct: 2
        },
        {
            question: "Quelle est la formule de l'ammoniac ?",
            answers: ["NH3", "NH4", "NO2", "N2O"],
            correct: 0
        },
        {
            question: "Quelle est la charge d'un neutron ?",
            answers: ["+1", "-1", "0", "+2"],
            correct: 2
        },
    ],
    biology: [{
            question: "Quelle est la fonction principale des mitochondries ?",
            answers: ["Synthèse des protéines", "Production d'énergie (ATP)", "Stockage de l'ADN", "Photosynthèse"],
            correct: 1
        },
        {
            question: "Quel est le rôle de l'ARN messager (ARNm) ?",
            answers: ["Transport des acides aminés", "Copie de l'ADN pour la synthèse protéique", "Stockage de l'énergie", "Réplication de l'ADN"],
            correct: 1
        },
        {
            question: "Quel processus produit de l'oxygène dans les plantes ?",
            answers: ["Respiration cellulaire", "Photosynthèse", "Fermentation", "Glycolyse"],
            correct: 1
        },
        {
            question: "Quelle molécule est le support de l'information génétique ?",
            answers: ["ARN", "ADN", "Protéine", "Lipide"],
            correct: 1
        },
        {
            question: "Quelle est la phase de la mitose où les chromosomes s'alignent au centre de la cellule ?",
            answers: ["Prophase", "Métaphase", "Anaphase", "Télophase"],
            correct: 1
        },
        {
            question: "Quel organe est responsable de la filtration du sang chez les mammifères ?",
            answers: ["Cœur", "Poumon", "Rein", "Foie"],
            correct: 2
        },
        {
            question: "Quel type de cellule est responsable de la production d'anticorps ?",
            answers: ["Neurone", "Lymphocyte B", "Érythrocyte", "Ostéocyte"],
            correct: 1
        },
        {
            question: "Quelle hormone régule la glycémie ?",
            answers: ["Adrénaline", "Insuline", "Testostérone", "Œstrogène"],
            correct: 1
        },
        {
            question: "Quel est le nom du processus de division cellulaire qui produit des gamètes ?",
            answers: ["Mitose", "Méiose", "Réplication", "Transcription"],
            correct: 1
        },
        {
            question: "Quelle structure végétale permet l'absorption de l'eau et des sels minéraux ?",
            answers: ["Feuille", "Tige", "Racine", "Fleur"],
            correct: 2
        },
        {
            question: "Quel est le rôle des ribosomes ?",
            answers: ["Synthèse des protéines", "Stockage de l'ADN", "Production d'ATP", "Détoxification"],
            correct: 0
        },
        {
            question: "Quelle est la fonction principale des globules rouges ?",
            answers: ["Transport de l'oxygène", "Défense immunitaire", "Coagulation", "Production d'hormones"],
            correct: 0
        },
        {
            question: "Quel est le produit final de la glycolyse ?",
            answers: ["Acétyl-CoA", "Glucose", "Pyruvate", "ATP uniquement"],
            correct: 2
        },
        {
            question: "Quelle partie du cerveau contrôle la coordination motrice ?",
            answers: ["Cerveau", "Cervelet", "Tronc cérébral", "Hypothalamus"],
            correct: 1
        },
        {
            question: "Quel est le nom de la théorie expliquant l'origine des mitochondries et chloroplastes ?",
            answers: ["Théorie cellulaire", "Théorie endosymbiotique", "Théorie de l'évolution", "Théorie chromosomique"],
            correct: 1
        },
        {
            question: "Quelle molécule est responsable de la couleur verte des plantes ?",
            answers: ["Chlorophylle", "Carotène", "Xanthophylle", "Anthocyane"],
            correct: 0
        },
        {
            question: "Quelle est la fonction de l'ARN de transfert (ARNt) ?",
            answers: ["Transport des acides aminés vers les ribosomes", "Réplication de l'ADN", "Stockage de l'énergie", "Dégradation des protéines"],
            correct: 0
        },
        {
            question: "Quelle est la première étape de la respiration cellulaire ?",
            answers: ["Cycle de Krebs", "Chaîne respiratoire", "Glycolyse", "Fermentation"],
            correct: 2
        },
        {
            question: "Quel est le rôle des enzymes ?",
            answers: ["Ralentir les réactions chimiques", "Accélérer les réactions sans être consommées", "Stocker l'énergie", "Transporter l'oxygène"],
            correct: 1
        },
        {
            question: "Quelle structure protège l'ADN dans les cellules eucaryotes ?",
            answers: ["Nucléole", "Noyau", "Ribosome", "Vacuole"],
            correct: 1
        },
        {
            question: "Quelle est la fonction des stomates chez les plantes ?",
            answers: ["Absorption de l'eau", "Échanges gazeux", "Photosynthèse", "Stockage des nutriments"],
            correct: 1
        },
        {
            question: "Quelle maladie est causée par un déficit en insuline ?",
            answers: ["Cancer", "Diabète de type 1", "Alzheimer", "Parkinson"],
            correct: 1
        },
        {
            question: "Quel est le nom du processus par lequel l'ARN est synthétisé à partir de l'ADN ?",
            answers: ["Réplication", "Transcription", "Traduction", "Transduction"],
            correct: 1
        },
        {
            question: "Quel organe produit la bile ?",
            answers: ["Pancréas", "Estomac", "Foie", "Intestin grêle"],
            correct: 2
        },
        {
            question: "Quelle est la fonction des leucocytes ?",
            answers: ["Transport de l'oxygène", "Défense immunitaire", "Coagulation", "Production d'hormones"],
            correct: 1
        },
        {
            question: "Quel est le nom du cycle qui produit du CO2 et de l'ATP dans les mitochondries ?",
            answers: ["Cycle de Calvin", "Cycle de Krebs", "Cycle de l'urée", "Cycle de l'eau"],
            correct: 1
        },
        {
            question: "Quelle est la molécule qui stocke l'énergie à court terme dans les cellules ?",
            answers: ["ADN", "ARN", "ATP", "Glucose"],
            correct: 2
        },
        {
            question: "Quelle est la structure responsable de la motilité des spermatozoïdes ?",
            answers: ["Cils", "Flagelle", "Pseudopode", "Membrane plasmique"],
            correct: 1
        },
        {
            question: "Quelle est la fonction principale des neurones ?",
            answers: ["Production d'hormones", "Transmission des signaux électriques", "Stockage des nutriments", "Défense immunitaire"],
            correct: 1
        },
        {
            question: "Quel est le nom de la phase de croissance entre deux divisions cellulaires ?",
            answers: ["Mitose", "Cytocinèse", "Interphase", "Métaphase"],
            correct: 2
        },
        {
            question: "Quelle hormone est produite par la glande thyroïde ?",
            answers: ["Insuline", "Thyroxine", "Adrénaline", "Œstrogène"],
            correct: 1
        },
        {
            question: "Quel est le rôle de l'ADN polymérase ?",
            answers: ["Synthétiser de l'ARN", "Répliquer l'ADN", "Dégrader les protéines", "Transport des lipides"],
            correct: 1
        },
        {
            question: "Quelle est la fonction des plaques de Peyer dans l'intestin ?",
            answers: ["Absorption des nutriments", "Défense immunitaire", "Production d'enzymes", "Stockage de la bile"],
            correct: 1
        },
        {
            question: "Quel est le nom du processus par lequel les cellules absorbent des molécules externes ?",
            answers: ["Exocytose", "Endocytose", "Osmose", "Diffusion"],
            correct: 1
        },
        {
            question: "Quelle structure permet les échanges génétiques entre bactéries ?",
            answers: ["Flagelle", "Pilus", "Plasmide", "Capsule"],
            correct: 2
        },
    ],
    physics: [{
            question: "Quelle est l'unité de la résistance électrique ?",
            answers: ["Volt", "Ampère", "Ohm", "Watt"],
            correct: 2
        },
        {
            question: "Quelle loi décrit la force entre deux charges électriques ?",
            answers: ["Loi d'Ohm", "Loi de Coulomb", "Loi de Newton", "Loi de Faraday"],
            correct: 1
        },
        {
            question: "Qu'est-ce que l'énergie cinétique ?",
            answers: ["Énergie stockée", "Énergie due au mouvement", "Énergie thermique", "Énergie potentielle"],
            correct: 1
        },
        {
            question: "Quel principe explique la flottabilité des objets ?",
            answers: ["Principe de Pascal", "Principe d'Archimède", "Principe de Bernoulli", "Principe de Hooke"],
            correct: 1
        },
        {
            question: "Quelle est la vitesse de la lumière dans le vide ?",
            answers: ["300 000 km/s", "150 000 km/s", "1 000 km/s", "100 km/s"],
            correct: 0
        },
        {
            question: "Quelle est l'unité de la puissance électrique ?",
            answers: ["Joule", "Watt", "Volt", "Ohm"],
            correct: 1
        },
        {
            question: "Quelle loi stipule que 'Tout corps persévère dans son état de repos ou de mouvement uniforme sauf si des forces agissent sur lui' ?",
            answers: ["Loi de Newton (1ère loi)", "Loi de Newton (2ème loi)", "Loi de Newton (3ème loi)", "Loi de Hooke"],
            correct: 0
        },
        {
            question: "Quel phénomène explique la dispersion de la lumière blanche par un prisme ?",
            answers: ["Réflexion", "Réfraction", "Diffraction", "Dispersion chromatique"],
            correct: 3
        },
        {
            question: "Quelle est la formule de l'énergie potentielle gravitationnelle ?",
            answers: ["Ep = mgh", "Ep = ½mv²", "Ep = kx²", "Ep = qV"],
            correct: 0
        },
        {
            question: "Quel type d'onde nécessite un milieu matériel pour se propager ?",
            answers: ["Onde électromagnétique", "Onde sonore", "Onde lumineuse", "Onde radio"],
            correct: 1
        },
        {
            question: "Quelle est l'unité de la force ?",
            answers: ["Joule", "Newton", "Pascal", "Watt"],
            correct: 1
        },
        {
            question: "Quel appareil mesure le courant électrique ?",
            answers: ["Voltmètre", "Ampèremètre", "Ohmmètre", "Galvanomètre"],
            correct: 1
        },
        {
            question: "Quelle est l'accélération due à la gravité sur Terre ?",
            answers: ["9,8 m/s²", "10 m/s²", "5 m/s²", "20 m/s²"],
            correct: 0
        },
        {
            question: "Quelle loi relie la tension, l'intensité et la résistance ?",
            answers: ["Loi de Coulomb", "Loi d'Ohm", "Loi de Faraday", "Loi de Kirchhoff"],
            correct: 1
        },
        {
            question: "Quel phénomène permet aux avions de voler ?",
            answers: ["Effet Doppler", "Effet Venturi", "Effet Magnus", "Effet Bernoulli"],
            correct: 3
        },
        {
            question: "Quelle est la formule de la puissance mécanique ?",
            answers: ["P = VI", "P = Fd", "P = W/t", "P = ρgh"],
            correct: 2
        },
        {
            question: "Quel principe explique le fonctionnement des fusées ?",
            answers: ["Principe de Pascal", "Principe d'action-réaction", "Principe de Huygens", "Principe de Fermat"],
            correct: 1
        },
        {
            question: "Quelle est l'unité de la pression ?",
            answers: ["Newton", "Pascal", "Joule", "Watt"],
            correct: 1
        },
        {
            question: "Quel type de circuit a une seule boucle de courant ?",
            answers: ["Circuit parallèle", "Circuit mixte", "Circuit en dérivation", "Circuit série"],
            correct: 3
        },
        {
            question: "Quelle est la formule de la force centripète ?",
            answers: ["F = ma", "F = mv²/r", "F = G(m₁m₂)/r²", "F = kx"],
            correct: 1
        },
        {
            question: "Quel instrument mesure la différence de potentiel électrique ?",
            answers: ["Ampèremètre", "Ohmmètre", "Voltmètre", "Gaussmètre"],
            correct: 2
        },
        {
            question: "Quelle est la loi de conservation en physique nucléaire qui explique les réactions nucléaires ?",
            answers: ["Loi des gaz parfaits", "Loi de conservation de la masse-énergie", "Loi de Snell-Descartes", "Loi de Wien"],
            correct: 1
        },
        {
            question: "Quel phénomène permet aux fibres optiques de fonctionner ?",
            answers: ["Réflexion totale interne", "Diffraction", "Interférence", "Polarisation"],
            correct: 0
        },
        {
            question: "Quelle est l'unité de la fréquence ?",
            answers: ["Hertz", "Tesla", "Becquerel", "Sievert"],
            correct: 0
        },
        {
            question: "Quelle loi décrit la force exercée par un ressort ?",
            answers: ["Loi de Coulomb", "Loi de Hooke", "Loi de Boyle", "Loi de Faraday"],
            correct: 1
        },
        {
            question: "Quel est le nom du changement d'état solide → liquide ?",
            answers: ["Sublimation", "Fusion", "Vaporisation", "Condensation"],
            correct: 1
        },
        {
            question: "Quelle particule est responsable du courant électrique dans les métaux ?",
            answers: ["Proton", "Neutron", "Électron", "Positron"],
            correct: 2
        },
        {
            question: "Quelle est la formule de l'énergie stockée dans un condensateur ?",
            answers: ["E = ½CV²", "E = ½LI²", "E = ½kx²", "E = mgh"],
            correct: 0
        },
        {
            question: "Quel type de rayonnement a le pouvoir pénétrant le plus élevé ?",
            answers: ["Rayons alpha", "Rayons bêta", "Rayons gamma", "Rayons X"],
            correct: 2
        },
        {
            question: "Quelle est la formule de la quantité de mouvement ?",
            answers: ["p = mv", "p = F/A", "p = ρV", "p = nRT"],
            correct: 0
        },
        {
            question: "Quel effet explique le décalage vers le rouge de la lumière des galaxies lointaines ?",
            answers: ["Effet Doppler", "Effet photoélectrique", "Effet Compton", "Effet Hall"],
            correct: 0
        },
        {
            question: "Quelle est la constante universelle de gravitation (G) ?",
            answers: ["6,67 × 10⁻¹¹ N·m²/kg²", "9,8 m/s²", "3 × 10⁸ m/s", "1,6 × 10⁻¹⁹ C"],
            correct: 0
        },
        {
            question: "Quel principe stipule que 'La pression exercée sur un fluide incompressible est transmise intégralement' ?",
            answers: ["Principe de Bernoulli", "Principe de Pascal", "Principe d'Archimède", "Principe de Huygens"],
            correct: 1
        },
        {
            question: "Quelle est l'unité de l'inductance ?",
            answers: ["Farad", "Henry", "Tesla", "Weber"],
            correct: 1
        },
        {
            question: "Quel phénomène explique la production de courant par un champ magnétique variable ?",
            answers: ["Effet Joule", "Effet photoélectrique", "Induction électromagnétique", "Effet Hall"],
            correct: 2
        },
    ],
};

let selectedTopics = [];
let quizQuestions = [];
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 10; // 10 seconds per question
let points = 0;
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
    points = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timedOutQuestions = 0;
    scoreElement.textContent = points;

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
        points += 10;
        correctAnswers++;
    } else {
        feedbackElement.innerHTML = `Incorrect! <span class="ddaak-badge">0 DDAK</span><br>The correct answer is: ${currentQuestion.answers[currentQuestion.correct]}`;
        feedbackElement.className = "feedback-incorrect";
        wrongAnswers++;
    }

    scoreElement.textContent = points;

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

    finalScoreElement.textContent = points;
    possibleScoreElement.textContent = quizQuestions.length * 10;

    // Update statistics
    document.getElementById("ddaak-points").textContent = points;
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

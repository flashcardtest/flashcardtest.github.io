// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a flashcard page
  const flashcardContainer = document.querySelector('.flashcard-container');
  if (!flashcardContainer) return;

  // Get all required elements
  const flashcard = document.querySelector('.flashcard');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const shuffleButton = document.getElementById('shuffle-button');
  const progressText = document.getElementById('progress-text');
  
  // Get flashcards data from the appropriate subject
  const pageTitle = document.title;
  let currentIndex = 0;
  let flashcards = [];
  
  // Determine which subject flashcards to load
  if (pageTitle.includes('Physique')) {
    flashcards = physicsFlashcards;
  } else if (pageTitle.includes('Chimie')) {
    flashcards = chemistryFlashcards;
  } else if (pageTitle.includes('Biologie')) {
    flashcards = biologyFlashcards;
  }
  
  // Initialize with the first flashcard
  if (flashcards.length > 0) {
    updateFlashcard();
    updateProgressText();
  }
  
  // Add click event to flip the flashcard
  flashcard.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });
  
  // Previous button functionality
  prevButton.addEventListener('click', function() {
    if (currentIndex > 0) {
      // Flip to front first to prevent showing back content
      flashcard.classList.remove('flipped');
      // Wait for flip animation to complete before changing content
      setTimeout(() => {
        currentIndex--;
        updateFlashcard();
        updateProgressText();
      }, 300); // assuming 300ms flip animation
    }
  });

  // Next button functionality
  nextButton.addEventListener('click', function() {
    if (currentIndex < flashcards.length - 1) {
      // Flip to front first to prevent showing back content
      flashcard.classList.remove('flipped');
      // Wait for flip animation to complete before changing content
      setTimeout(() => {
        currentIndex++;
        updateFlashcard();
        updateProgressText();
      }, 300); // assuming 300ms flip animation
    }
  });

  // Shuffle button functionality
  shuffleButton.addEventListener('click', function() {
    shuffleArray(flashcards);
    currentIndex = 0;
    updateFlashcard();
    updateProgressText();
    // Reset to front face when shuffling
    flashcard.classList.remove('flipped');
  });
  
  // Function to update flashcard content
  function updateFlashcard() {
    const frontContent = document.querySelector('.flashcard-front p');
    const backContent = document.querySelector('.flashcard-back p');
    
    frontContent.textContent = flashcards[currentIndex].question;
    backContent.textContent = flashcards[currentIndex].answer;
    
    // Enable/disable navigation buttons based on position
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === flashcards.length - 1;
  }
  
  // Function to update progress text
  function updateProgressText() {
    progressText.textContent = `Carte ${currentIndex + 1} sur ${flashcards.length}`;
  }
  
  // Function to shuffle array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});

// Physics flashcards data (Grade 11 Ontario Curriculum)
const physicsFlashcards = [
  {
    question: "Quelle est la première loi de Newton ?",
    answer: "Un objet reste au repos ou en mouvement uniforme en ligne droite à moins qu'une force externe ne s'exerce sur lui. Aussi connue sous le nom de Loi d'inertie."
  },
  {
    question: "Quelle est la deuxième loi de Newton ?",
    answer: "L'accélération d'un objet est directement proportionnelle à la force nette qui agit sur lui et inversement proportionnelle à sa masse. F = ma"
  },
  {
    question: "Quelle est la troisième loi de Newton ?",
    answer: "Pour toute action, il existe une réaction égale et opposée. Lorsqu'un corps exerce une force sur un deuxième corps, ce dernier exerce une force égale en magnitude et opposée en direction sur le premier."
  },
  {
    question: "Quelle est la formule de l'énergie cinétique ?",
    answer: "Énergie Cinétique (EC) = ½mv², où m est la masse et v est la vitesse."
  },
  {
    question: "Quelle est la formule de l'énergie potentielle gravitationnelle ?",
    answer: "Énergie Potentielle Gravitationnelle (EP) = mgh, où m est la masse, g est l'accélération due à la gravité, et h est la hauteur."
  },
  {
    question: "Quelle est la loi de conservation de l'énergie ?",
    answer: "L'énergie ne peut être ni créée ni détruite, mais seulement transformée d'une forme en une autre. L'énergie totale d'un système isolé reste constante."
  },
  {
    question: "Qu'est-ce que le travail en physique ?",
    answer: "Le travail est le transfert d'énergie qui se produit lorsque une force fait bouger un objet dans la direction de cette force. W = F × d × cosθ, où F est la force, d est le déplacement, et θ est l'angle entre eux."
  },
  {
    question: "Qu'est-ce que la puissance en physique ?",
    answer: "La puissance est la vitesse à laquelle le travail est effectué ou l'énergie est transférée. P = W/t, où W est le travail et t est le temps. L'unité est le watt (W)."
  },
  {
    question: "Quelle est la différence entre vitesse et vitesse ?",
    answer: "La vitesse est une grandeur scalaire qui indique 'à quelle vitesse' un objet se déplace. La vitesse est une grandeur vectorielle qui indique 'à quelle vitesse et dans quelle direction' un objet se déplace."
  },
  {
    question: "Qu'est-ce que l'accélération ?",
    answer: "L'accélération est la variation de la vitesse par rapport au temps. a = (v₂ - v₁)/t, où v₁ est la vitesse initiale, v₂ est la vitesse finale, et t est le temps."
  }
];

// Chemistry flashcards data (Grade 11 Ontario Curriculum)
const chemistryFlashcards = [
  {
    question: "Qu'est-ce qu'un atome ?",
    answer: "Un atome est la plus petite unité de matière qui conserve les propriétés d'un élément. Il est composé d'un noyau (contenant protons et neutrons) entouré d'électrons."
  },
  {
    question: "Quelle est la différence entre une liaison ionique et covalente ?",
    answer: "Les liaisons ioniques se forment lorsque des électrons sont transférés d'un atome à un autre, créant des ions de charges opposées qui s'attirent. Les liaisons covalentes se forment lorsque les atomes partagent des électrons."
  },
  {
    question: "Qu'est-ce que le concept de mole ?",
    answer: "Une mole est une unité de mesure égale à 6,022 × 10²³ (nombre d'Avogadro) de particules. Elle représente la quantité de substance contenant autant de particules qu'il y a d'atomes dans 12 grammes de carbone-12."
  },
  {
    question: "Quelle est la loi périodique ?",
    answer: "Les propriétés des éléments sont des fonctions périodiques de leurs numéros atomiques. Les éléments ayant des propriétés similaires apparaissent à intervalles réguliers lorsqu'ils sont classés par numéro atomique croissant."
  },
  {
    question: "Qu'est-ce qu'un isotope ?",
    answer: "Les isotopes sont des atomes du même élément qui ont le même nombre de protons mais un nombre différent de neutrons, ce qui entraîne une masse atomique différente."
  },
  {
    question: "Qu'est-ce que l'échelle pH ?",
    answer: "L'échelle pH mesure à quel point une substance est acide ou basique, allant de 0 à 14. Un pH inférieur à 7 est acide, un pH de 7 est neutre, et un pH supérieur à 7 est basique (alcalin)."
  },
  {
    question: "Qu'est-ce qu'une équation chimique ?",
    answer: "Une équation chimique est une représentation symbolique d'une réaction chimique utilisant les formules chimiques. Elle montre les réactifs et les produits, et doit être équilibrée pour satisfaire la loi de conservation de la masse."
  },
  {
    question: "Quels sont les états de la matière ?",
    answer: "Les principaux états de la matière sont solide (forme et volume définis), liquide (forme indéfinie mais volume défini), gazeux (forme et volume indéfinis), et plasma (état ionisé de la matière)."
  },
  {
    question: "Quelle est la différence entre les réactions exothermiques et endothermiques ?",
    answer: "Les réactions exothermiques libèrent de l'énergie (chaleur) vers le milieu environnant. Les réactions endothermiques absorbent de l'énergie (chaleur) du milieu environnant."
  },
  {
    question: "Qu'est-ce qu'un catalyseur ?",
    answer: "Un catalyseur est une substance qui augmente la vitesse d'une réaction chimique sans être consommée au cours du processus. Il fonctionne en fournissant un chemin alternatif avec une énergie d'activation plus faible."
  }
];

// Biology flashcards data (Grade 11 Ontario Curriculum)
const biologyFlashcards = [
  {
    question: "Qu'est-ce que la respiration cellulaire ?",
    answer: "La respiration cellulaire est le processus par lequel les cellules convertissent le glucose et l'oxygène en énergie (ATP), dioxyde de carbone et eau. L'équation globale est : C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP"
  },
  {
    question: "Qu'est-ce que la photosynthèse ?",
    answer: "La photosynthèse est le processus par lequel les plantes, les algues et certaines bactéries convertissent l'énergie lumineuse, le dioxyde de carbone et l'eau en glucose et oxygène. L'équation globale est : 6CO₂ + 6H₂O + énergie lumineuse → C₆H₁₂O₆ + 6O₂"
  },
  {
    question: "Qu'est-ce que l'ADN ?",
    answer: "L'ADN (acide désoxyribonucléique) est une molécule qui contient les instructions génétiques pour le développement, le fonctionnement et la reproduction de tous les organismes vivants connus. Il se compose de deux brins formant une structure en double hélice."
  },
  {
    question: "Qu'est-ce que la sélection naturelle ?",
    answer: "La sélection naturelle est le processus par lequel les espèces s'adaptent à leur environnement. Les individus possédant des caractères favorables ont plus de chances de survivre et de se reproduire, transmettant ces caractères à la génération suivante, tandis que les caractères défavorables tendent à disparaître."
  },
  {
    question: "Quelle est la différence entre la mitose et la méiose ?",
    answer: "La mitose est une division cellulaire qui donne deux cellules filles identiques, chacune ayant le même nombre de chromosomes que la cellule parente. La méiose est une division cellulaire qui donne quatre cellules filles, chacune ayant la moitié du nombre de chromosomes que la cellule parente (utilisée dans la reproduction sexuée)."
  },
  {
    question: "Qu'est-ce que la biodiversité ?",
    answer: "La biodiversité fait référence à la variété des formes de vie au sein d'un écosystème, incluant la diversité des espèces, la diversité génétique au sein des espèces, et la diversité des écosystèmes."
  },
  {
    question: "Quels sont les niveaux d'organisation biologique ?",
    answer: "De plus petit à plus grand : atome → molécule → organite → cellule → tissu → organe → système d'organes → organisme → population → communauté → écosystème → biome → biosphère."
  },
  {
    question: "Qu'est-ce que l'homéostasie ?",
    answer: "L'homéostasie est le maintien d'un environnement interne stable malgré les changements des conditions externes. Exemples incluent la régulation de la température, les niveaux de glucose sanguin et l'équilibre du pH."
  },
  {
    question: "Quelle est la différence entre les cellules végétales et animales ?",
    answer: "Les cellules végétales ont des parois cellulaires, des chloroplastes et un grand vacuole central. Les cellules animales manquent ces structures mais ont des centrioles. Les deux ont membrane plasmique, cytoplasme, noyau, mitochondries et autres organites."
  },
  {
    question: "Quel est le rôle des enzymes dans les systèmes biologiques ?",
    answer: "Les enzymes sont des catalyseurs biologiques qui accélèrent les réactions chimiques dans les organismes vivants sans être consommés. Ils fonctionnent en abaissant l'énergie d'activation nécessaire aux réactions pour qu'elles se produisent, et sont spécifiques à des substrats particuliers."
  }
];

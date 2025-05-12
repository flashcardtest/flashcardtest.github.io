// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si nous sommes sur une page de cartes flash
  const flashcardContainer = document.querySelector('.flashcard-container');
  if (!flashcardContainer) return;

  // Récupérer tous les éléments nécessaires
  const flashcard = document.querySelector('.flashcard');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const shuffleButton = document.getElementById('shuffle-button');
  const progressText = document.getElementById('progress-text');
  
  // Obtenir les données des cartes flash du sujet approprié
  const pageTitle = document.title;
  let currentIndex = 0;
  let flashcards = [];
  
  // Déterminer quelles cartes flash charger selon le sujet
  if (pageTitle.includes('Physique')) {
    flashcards = physicsFlashcards;
  } else if (pageTitle.includes('Chimie')) {
    flashcards = chemistryFlashcards;
  } else if (pageTitle.includes('Biologie')) {
    flashcards = biologyFlashcards;
  }
  
  // Initialiser avec la première carte flash
  if (flashcards.length > 0) {
    updateFlashcard();
    updateProgressText();
  }
  
  // Ajouter un événement de clic pour retourner la carte flash
  flashcard.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });
  
  // Fonctionnalité du bouton Précédent
  prevButton.addEventListener('click', function() {
    if (currentIndex > 0) {
      // Retourner au recto d'abord pour éviter d'afficher le contenu du verso
      flashcard.classList.remove('flipped');
      // Attendre la fin de l'animation avant de changer le contenu
      setTimeout(() => {
        currentIndex--;
        updateFlashcard();
        updateProgressText();
      }, 300); // animation de retournement supposée de 300ms
    }
  });

  // Fonctionnalité du bouton Suivant
  nextButton.addEventListener('click', function() {
    if (currentIndex < flashcards.length - 1) {
      // Retourner au recto d'abord pour éviter d'afficher le contenu du verso
      flashcard.classList.remove('flipped');
      // Attendre la fin de l'animation avant de changer le contenu
      setTimeout(() => {
        currentIndex++;
        updateFlashcard();
        updateProgressText();
      }, 300); // animation de retournement supposée de 300ms
    }
  });

  // Fonctionnalité du bouton Mélanger
  shuffleButton.addEventListener('click', function() {
    shuffleArray(flashcards);
    currentIndex = 0;
    updateFlashcard();
    updateProgressText();
    // Réinitialiser au recto lors du mélange
    flashcard.classList.remove('flipped');
  });
  
  // Fonction pour mettre à jour le contenu de la carte flash
  function updateFlashcard() {
    const frontContent = document.querySelector('.flashcard-front p');
    const backContent = document.querySelector('.flashcard-back p');
    
    frontContent.textContent = flashcards[currentIndex].question;
    backContent.textContent = flashcards[currentIndex].answer;
    
    // Activer/désactiver les boutons de navigation selon la position
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === flashcards.length - 1;
  }
  
  // Fonction pour mettre à jour le texte de progression
  function updateProgressText() {
    progressText.textContent = `Carte ${currentIndex + 1} sur ${flashcards.length}`;
  }
  
  // Fonction pour mélanger le tableau (algorithme de Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});

// Données des cartes flash de physique (Programme de 11e année, Ontario)
const physicsFlashcards = [
  {
    question: "Quelle est la première loi du mouvement de Newton ?",
    answer: "Un objet restera au repos ou en mouvement uniforme en ligne droite à moins qu'une force extérieure n'agisse sur lui. Également connue sous le nom de loi de l'inertie."
  },
  {
    question: "Quelle est la deuxième loi du mouvement de Newton ?",
    answer: "L'accélération d'un objet est directement proportionnelle à la force nette qui agit sur lui et inversement proportionnelle à sa masse. F = ma"
  },
  {
    question: "Quelle est la troisième loi du mouvement de Newton ?",
    answer: "À chaque action, il y a une réaction égale et opposée. Lorsqu'un corps exerce une force sur un second corps, le second corps exerce une force égale en magnitude et opposée en direction sur le premier corps."
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
    question: "Quelle est la loi de la conservation de l'énergie ?",
    answer: "L'énergie ne peut être ni créée ni détruite, seulement transformée d'une forme à une autre. L'énergie totale d'un système isolé reste constante."
  },
  {
    question: "Quelle est la définition du travail en physique ?",
    answer: "Le travail est le transfert d'énergie qui se produit lorsqu'une force fait déplacer un objet dans la direction de la force. W = F × d × cosθ, où F est la force, d est le déplacement, et θ est l'angle entre eux."
  },
  {
    question: "Qu'est-ce que la puissance en physique ?",
    answer: "La puissance est le taux auquel le travail est effectué ou l'énergie est transférée. P = W/t, où W est le travail et t est le temps. L'unité est le watt (W)."
  },
  {
    question: "Quelle est la différence entre la vitesse et la vélocité ?",
    answer: "La vitesse est une grandeur scalaire qui indique 'à quelle vitesse' un objet se déplace. La vélocité est une grandeur vectorielle qui indique 'à quelle vitesse et dans quelle direction' un objet se déplace."
  },
  {
    question: "Qu'est-ce que l'accélération ?",
    answer: "L'accélération est le taux de variation de la vitesse par rapport au temps. a = (v₂ - v₁)/t, où v₁ est la vitesse initiale, v₂ est la vitesse finale, et t est le temps."
  }
];

// Données des cartes flash de chimie (Programme de 11e année, Ontario)
const chemistryFlashcards = [
  {
    question: "Qu'est-ce qu'un atome ?",
    answer: "Un atome est l'unité la plus petite de la matière qui conserve les propriétés d'un élément. Il se compose d'un noyau (contenant des protons et des neutrons) entouré d'électrons."
  },
  {
    question: "Quelle est la différence entre une liaison ionique et une liaison covalente ?",
    answer: "Les liaisons ioniques se forment lorsque des électrons sont transférés d'un atome à un autre, créant des ions chargés de manière opposée qui s'attirent. Les liaisons covalentes se forment lorsque les atomes partagent des électrons."
  },
  {
    question: "Qu'est-ce que le concept de mole ?",
    answer: "Une mole est une unité de mesure égale à 6.022 × 10²³ (le nombre d'Avogadro) particules. Elle représente la quantité de substance contenant autant de particules qu'il y a d'atomes dans 12 grammes de carbone-12."
  },
  {
    question: "Qu'est-ce que la loi périodique ?",
    answer: "Les propriétés des éléments sont des fonctions périodiques de leurs numéros atomiques. Les éléments ayant des propriétés similaires apparaissent à intervalles réguliers lorsqu'ils sont classés par numéro atomique croissant."
  },
  {
    question: "Qu'est-ce qu'un isotope ?",
    answer: "Les isotopes sont des atomes du même élément ayant le même nombre de protons mais un nombre différent de neutrons, ce qui donne des masses atomiques différentes."
  },
  {
    question: "Qu'est-ce que l'échelle de pH ?",
    answer: "L'échelle de pH mesure à quel point une substance est acide ou basique, allant de 0 à 14. Un pH inférieur à 7 est acide, un pH de 7 est neutre, et un pH supérieur à 7 est basique (alcalin)."
  },
  {
    question: "Qu'est-ce qu'une équation chimique ?",
    answer: "Une équation chimique est une représentation symbolique d'une réaction chimique utilisant des formules chimiques. Elle montre les réactifs et les produits et doit être équilibrée pour satisfaire la loi de la conservation de la masse."
  },
  {
    question: "Quels sont les états de la matière ?",
    answer: "Les principaux états de la matière sont solide (forme et volume définis), liquide (forme indéfinie mais volume défini), gaz (forme et volume indéfinis), et plasma (état ionisé de la matière)."
  },
  {
    question: "Quelle est la différence entre une réaction exothermique et endothermique ?",
    answer: "Les réactions exothermiques libèrent de l'énergie (chaleur) dans l'environnement. Les réactions endothermiques absorbent de l'énergie (chaleur) de l'environnement."
  },
  {
    question: "Qu'est-ce qu'un catalyseur ?",
    answer: "Un catalyseur est une substance qui augmente le taux d'une réaction chimique sans être consommée dans le processus. Il fonctionne en fournissant un chemin alternatif avec une énergie d'activation plus faible."
  }
];

// Données des cartes flash de biologie (Programme de 11e année, Ontario)
const biologyFlashcards = [
  {
    question: "Qu'est-ce que la respiration cellulaire ?",
    answer: "La respiration cellulaire est le processus par lequel les cellules convertissent le glucose et l'oxygène en énergie (ATP), dioxyde de carbone et eau. L'équation globale est : C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP"
  },
  {
    question: "Qu'est-ce que la photosynthèse ?",
    answer: "La photosynthèse est le processus par lequel les plantes, les algues et certaines bactéries convertissent l'énergie lumineuse, le dioxyde de carbone et l'eau en glucose et en oxygène. L'équation globale est : 6CO₂ + 6H₂O + énergie lumineuse → C₆H₁₂O₆ + 6O₂"
  },
  {
    question: "Qu'est-ce que l'ADN ?",
    answer: "L'ADN (acide désoxyribonucléique) est une molécule qui contient les instructions génétiques pour le développement, le fonctionnement et la reproduction de tous les organismes vivants connus. Il est constitué de deux brins formant une structure en double hélice."
  },
  {
    question: "Qu'est-ce que la sélection naturelle ?",
    answer: "La sélection naturelle est le processus par lequel les espèces s'adaptent à leur environnement. Les individus ayant des caractéristiques favorables sont plus susceptibles de survivre et de se reproduire, transmettant ces caractéristiques à la génération suivante, tandis que les caractéristiques défavorables ont tendance à être éliminées."
  },
  {
    question: "Quelle est la différence entre la mitose et la méiose ?",
    answer: "La mitose est une division cellulaire qui donne deux cellules filles identiques, chacune ayant le même nombre de chromosomes que la cellule mère. La méiose est une division cellulaire qui donne quatre cellules filles, chacune ayant la moitié du nombre de chromosomes de la cellule mère (utilisée pour la reproduction sexuelle)."
  },
  {
    question: "Qu'est-ce que la biodiversité ?",
    answer: "La biodiversité fait référence à la variété des formes de vie au sein d'un écosystème, y compris la diversité des espèces, la diversité génétique au sein des espèces et la diversité des écosystèmes."
  },
  {
    question: "Quels sont les niveaux d'organisation biologique ?",
    answer: "Du plus petit au plus grand : atome → molécule → organite → cellule → tissu → organe → système organique → organisme → population → communauté → écosystème → biome → biosphère."
  },
  {
    question: "Qu'est-ce que l'homéostasie ?",
    answer: "L'homéostasie est le maintien d'un environnement interne stable malgré les changements dans les conditions externes. Des exemples incluent la régulation de la température, les niveaux de glucose dans le sang et l'équilibre du pH."
  },
  {
    question: "Quelle est la différence entre les cellules végétales et animales ?",
    answer: "Les cellules végétales ont des parois cellulaires, des chloroplastes et une grande vacuole centrale. Les cellules animales n'ont pas ces structures, mais ont des centrioles. Les deux ont des membranes cellulaires, du cytoplasme, un noyau, des mitochondries et d'autres organites."
  },
  {
    question: "Quel est le rôle des enzymes dans les systèmes biologiques ?",
    answer: "Les enzymes sont des catalyseurs biologiques qui accélèrent les réactions chimiques dans les organismes vivants sans être consommées. Elles fonctionnent en abaissant l'énergie d'activation requise pour que les réactions se produisent, et sont spécifiques à des substrats particuliers."
  }
];

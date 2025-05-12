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
  if (pageTitle.includes('Physics')) {
    flashcards = physicsFlashcards;
  } else if (pageTitle.includes('Chemistry')) {
    flashcards = chemistryFlashcards;
  } else if (pageTitle.includes('Biology')) {
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
    progressText.textContent = `Card ${currentIndex + 1} of ${flashcards.length}`;
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
    question: "What is Newton's First Law of Motion?",
    answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. Also known as the Law of Inertia."
  },
  {
    question: "What is Newton's Second Law of Motion?",
    answer: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma"
  },
  {
    question: "What is Newton's Third Law of Motion?",
    answer: "For every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body exerts a force equal in magnitude and opposite in direction on the first body."
  },
  {
    question: "What is the formula for kinetic energy?",
    answer: "Kinetic Energy (KE) = ½mv², where m is mass and v is velocity."
  },
  {
    question: "What is the formula for gravitational potential energy?",
    answer: "Gravitational Potential Energy (PE) = mgh, where m is mass, g is acceleration due to gravity, and h is height."
  },
  {
    question: "What is the Law of Conservation of Energy?",
    answer: "Energy cannot be created or destroyed, only transformed from one form to another. The total energy of an isolated system remains constant."
  },
  {
    question: "What is the definition of work in physics?",
    answer: "Work is the transfer of energy that occurs when a force causes an object to move in the direction of the force. W = F × d × cosθ, where F is force, d is displacement, and θ is the angle between them."
  },
  {
    question: "What is power in physics?",
    answer: "Power is the rate at which work is done or energy is transferred. P = W/t, where W is work and t is time. The unit is watts (W)."
  },
  {
    question: "What is the difference between speed and velocity?",
    answer: "Speed is a scalar quantity that refers to 'how fast' an object is moving. Velocity is a vector quantity that refers to 'how fast and in what direction' an object is moving."
  },
  {
    question: "What is acceleration?",
    answer: "Acceleration is the rate of change of velocity with respect to time. a = (v₂ - v₁)/t, where v₁ is initial velocity, v₂ is final velocity, and t is time."
  }
];

// Chemistry flashcards data (Grade 11 Ontario Curriculum)
const chemistryFlashcards = [
  {
    question: "What is an atom?",
    answer: "An atom is the smallest unit of matter that retains the properties of an element. It consists of a nucleus (containing protons and neutrons) surrounded by electrons."
  },
  {
    question: "What is the difference between an ionic and covalent bond?",
    answer: "Ionic bonds form when electrons are transferred from one atom to another, creating oppositely charged ions that attract. Covalent bonds form when atoms share electrons."
  },
  {
    question: "What is the mole concept?",
    answer: "A mole is a unit of measurement equal to 6.022 × 10²³ (Avogadro's number) particles. It represents the amount of substance containing as many particles as there are atoms in 12 grams of carbon-12."
  },
  {
    question: "What is the periodic law?",
    answer: "The properties of elements are periodic functions of their atomic numbers. Elements with similar properties occur at regular intervals when arranged by increasing atomic number."
  },
  {
    question: "What is an isotope?",
    answer: "Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons, resulting in different atomic masses."
  },
  {
    question: "What is the pH scale?",
    answer: "The pH scale measures how acidic or basic a substance is, ranging from 0 to 14. A pH less than 7 is acidic, a pH of 7 is neutral, and a pH greater than 7 is basic (alkaline)."
  },
  {
    question: "What is a chemical equation?",
    answer: "A chemical equation is a symbolic representation of a chemical reaction using chemical formulas. It shows the reactants and products, and must be balanced to satisfy the law of conservation of mass."
  },
  {
    question: "What are the states of matter?",
    answer: "The main states of matter are solid (definite shape and volume), liquid (indefinite shape but definite volume), gas (indefinite shape and volume), and plasma (ionized state of matter)."
  },
  {
    question: "What is the difference between exothermic and endothermic reactions?",
    answer: "Exothermic reactions release energy (heat) to the surroundings. Endothermic reactions absorb energy (heat) from the surroundings."
  },
  {
    question: "What is a catalyst?",
    answer: "A catalyst is a substance that increases the rate of a chemical reaction without being consumed in the process. It works by providing an alternative pathway with lower activation energy."
  }
];

// Biology flashcards data (Grade 11 Ontario Curriculum)
const biologyFlashcards = [
  {
    question: "What is cellular respiration?",
    answer: "Cellular respiration is the process by which cells convert glucose and oxygen into energy (ATP), carbon dioxide, and water. The overall equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP"
  },
  {
    question: "What is photosynthesis?",
    answer: "Photosynthesis is the process by which plants, algae, and some bacteria convert light energy, carbon dioxide, and water into glucose and oxygen. The overall equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂"
  },
  {
    question: "What is DNA?",
    answer: "DNA (deoxyribonucleic acid) is a molecule that contains the genetic instructions for the development, functioning, and reproduction of all known living organisms. It consists of two strands forming a double helix structure."
  },
  {
    question: "What is natural selection?",
    answer: "Natural selection is the process by which species adapt to their environment. Individuals with favorable traits are more likely to survive and reproduce, passing these traits to the next generation, while unfavorable traits tend to be eliminated."
  },
  {
    question: "What is the difference between mitosis and meiosis?",
    answer: "Mitosis is cell division that results in two identical daughter cells, each with the same number of chromosomes as the parent cell. Meiosis is cell division that results in four daughter cells, each with half the number of chromosomes as the parent cell (used in sexual reproduction)."
  },
  {
    question: "What is biodiversity?",
    answer: "Biodiversity refers to the variety of life forms within an ecosystem, including the diversity of species, genetic diversity within species, and the diversity of ecosystems."
  },
  {
    question: "What are the levels of biological organization?",
    answer: "From smallest to largest: atom → molecule → organelle → cell → tissue → organ → organ system → organism → population → community → ecosystem → biome → biosphere."
  },
  {
    question: "What is homeostasis?",
    answer: "Homeostasis is the maintenance of a stable internal environment despite changes in external conditions. Examples include temperature regulation, blood glucose levels, and pH balance."
  },
  {
    question: "What is the difference between plant and animal cells?",
    answer: "Plant cells have cell walls, chloroplasts, and a large central vacuole. Animal cells lack these structures but have centrioles. Both have cell membranes, cytoplasm, nucleus, mitochondria, and other organelles."
  },
  {
    question: "What is the role of enzymes in biological systems?",
    answer: "Enzymes are biological catalysts that speed up chemical reactions in living organisms without being consumed. They work by lowering the activation energy required for reactions to occur, and are specific to particular substrates."
  }
];

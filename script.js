// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si nous sommes sur une page de cartes flash
  const flashcardContainer = document.querySelector('.flashcard-container');
  if (!flashcardContainer) return;

  // Récupérer tous les éléments nécessaires (mise en cache des éléments DOM)
  const flashcard = document.querySelector('.flashcard');
  const flashcardInner = document.querySelector('.flashcard-inner');
  const frontContent = document.querySelector('.flashcard-front p');
  const backContent = document.querySelector('.flashcard-back p');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const shuffleButton = document.getElementById('shuffle-button');
  const progressText = document.getElementById('progress-text');
  
  // Obtenir les données des cartes flash du sujet approprié
  const pageTitle = document.title;
  let currentIndex = 0;
  let flashcards = [];
  let isAnimating = false; // Drapeau pour éviter les clics multiples pendant l'animation
  
  // Déterminer quelles cartes flash charger selon le sujet
  if (pageTitle.includes('Physique')) {
    flashcards = physicsFlashcards;
  } else if (pageTitle.includes('Chimie')) {
    flashcards = chemistryFlashcards;
  } else if (pageTitle.includes('Biologie')) {
    flashcards = biologyFlashcards;
  }
  
  // Précharger toutes les cartes flashs en mémoire
  const preloadedFlashcards = flashcards.map(card => {
    return {
      question: card.question,
      answer: card.answer
    };
  });
  
  // Initialiser avec la première carte flash
  if (preloadedFlashcards.length > 0) {
    updateFlashcard();
    updateProgressText();
  }
  
  // Ajouter un événement de clic pour retourner la carte flash
  flashcard.addEventListener('click', function() {
    if (!isAnimating) {
      this.classList.toggle('flipped');
    }
  });
  
  // Évènement de transition terminée
  flashcardInner.addEventListener('transitionend', function() {
    isAnimating = false;
  });
  
  // Fonctionnalité du bouton Précédent - optimisée
  prevButton.addEventListener('click', function() {
    if (currentIndex > 0 && !isAnimating) {
      isAnimating = true;
      
      // Retourner au recto d'abord si nécessaire
      if (flashcard.classList.contains('flipped')) {
        flashcard.classList.remove('flipped');
        
        // Un court délai pour permettre à l'animation de retournement de commencer
        setTimeout(() => {
          currentIndex--;
          updateFlashcard();
          updateProgressText();
        }, 50);
      } else {
        // Changement direct sans animation de retournement
        currentIndex--;
        updateFlashcard();
        updateProgressText();
        isAnimating = false;
      }
    }
  });

  // Fonctionnalité du bouton Suivant - optimisée
  nextButton.addEventListener('click', function() {
    if (currentIndex < preloadedFlashcards.length - 1 && !isAnimating) {
      isAnimating = true;
      
      // Retourner au recto d'abord si nécessaire
      if (flashcard.classList.contains('flipped')) {
        flashcard.classList.remove('flipped');
        
        // Un court délai pour permettre à l'animation de retournement de commencer
        setTimeout(() => {
          currentIndex++;
          updateFlashcard();
          updateProgressText();
        }, 50);
      } else {
        // Changement direct sans animation de retournement
        currentIndex++;
        updateFlashcard();
        updateProgressText();
        isAnimating = false;
      }
    }
  });

  // Support navigation au clavier
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' && !nextButton.disabled && !isAnimating) {
      nextButton.click();
    } else if (e.key === 'ArrowLeft' && !prevButton.disabled && !isAnimating) {
      prevButton.click();
    } else if (e.key === ' ' || e.key === 'Enter') {
      // Espace ou Entrée pour retourner la carte
      flashcard.click();
    }
  });

  // Fonctionnalité du bouton Mélanger - optimisée
  shuffleButton.addEventListener('click', function() {
    if (!isAnimating) {
      isAnimating = true;
      
      // Réinitialiser au recto lors du mélange
      flashcard.classList.remove('flipped');
      
      // Un court délai pour permettre à l'animation de retournement de terminer
      setTimeout(() => {
        shuffleArray(preloadedFlashcards);
        currentIndex = 0;
        updateFlashcard();
        updateProgressText();
        isAnimating = false;
      }, 50);
    }
  });
  
  // Fonction pour mettre à jour le contenu de la carte flash - optimisée
  function updateFlashcard() {
    const card = preloadedFlashcards[currentIndex];
    
    // Utiliser textContent au lieu de innerHTML pour de meilleures performances
    frontContent.textContent = card.question;
    backContent.textContent = card.answer;
    
    // Activer/désactiver les boutons de navigation selon la position
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === preloadedFlashcards.length - 1;
  }
  
  // Fonction pour mettre à jour le texte de progression
  function updateProgressText() {
    progressText.textContent = `Carte ${currentIndex + 1} sur ${preloadedFlashcards.length}`;
  }
  
  // Fonction pour mélanger le tableau (algorithme de Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});

// Données des cartes flash de physique (Programme de 11e année et 12e année, Ontario)(ChatGPT)
const physicsFlashcards = [
  // Questions originales (11e année)
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
  },
  // Nouvelles questions (11e année)
  {
    question: "Quelle est la formule pour le moment d'une force ?",
    answer: "Le moment d'une force (M) = F × d, où F est la force et d est la distance perpendiculaire entre la ligne d'action de la force et l'axe de rotation."
  },
  {
    question: "Quelles sont les unités de mesure pour la force dans le système SI ?",
    answer: "Le newton (N) est l'unité de mesure de la force dans le système SI."
  },
  {
    question: "Quelles sont les conditions d'équilibre pour un objet ?",
    answer: "Pour qu'un objet soit en équilibre, la somme des forces agissant sur lui doit être nulle (ΣF = 0) et la somme des moments doit également être nulle (ΣM = 0)."
  },
  {
    question: "Qu'est-ce qu'un mouvement harmonique simple ?",
    answer: "Un mouvement harmonique simple est un mouvement périodique oscillatoire où la force de rappel est proportionnelle au déplacement et dirigée vers la position d'équilibre. Ex: pendule, ressort."
  },
  {
    question: "Comment calcule-t-on la période d'un pendule simple ?",
    answer: "La période d'un pendule simple T = 2π√(L/g), où L est la longueur du pendule et g est l'accélération due à la gravité."
  },
  {
    question: "Qu'est-ce que la fréquence d'une onde ?",
    answer: "La fréquence est le nombre d'oscillations complètes par unité de temps. Elle se mesure en hertz (Hz) et est liée à la période par f = 1/T."
  },
  {
    question: "Quelles sont les caractéristiques d'une onde ?",
    answer: "Les caractéristiques d'une onde comprennent l'amplitude, la longueur d'onde, la fréquence, la période et la vitesse. Les ondes peuvent être transversales ou longitudinales."
  },
  {
    question: "Quelle est la relation entre la fréquence et la longueur d'onde ?",
    answer: "La relation entre la fréquence (f), la longueur d'onde (λ) et la vitesse de l'onde (v) est v = f × λ."
  },
  {
    question: "Qu'est-ce que la résonance ?",
    answer: "La résonance est un phénomène qui se produit lorsqu'un système est forcé d'osciller à sa fréquence naturelle, résultant en une amplitude d'oscillation maximale."
  },
  {
    question: "Quelle est la formule pour la quantité de mouvement (momentum) ?",
    answer: "La quantité de mouvement p = m × v, où m est la masse et v est la vitesse. C'est une quantité vectorielle."
  },
  {
    question: "Qu'est-ce que la loi de la conservation de la quantité de mouvement ?",
    answer: "Dans un système isolé (sans forces externes), la quantité de mouvement totale reste constante. Cette loi est fondamentale pour comprendre les collisions."
  },
  {
    question: "Comment calcule-t-on la densité d'un objet ?",
    answer: "La densité d'un objet ρ = m/V, où m est la masse et V est le volume. Elle s'exprime généralement en kg/m³."
  },
  {
    question: "Qu'est-ce que la pression hydrostatique ?",
    answer: "La pression hydrostatique est la pression exercée par un fluide en raison de son poids. P = ρgh, où ρ est la densité du fluide, g est l'accélération due à la gravité, et h est la profondeur."
  },
  {
    question: "Qu'est-ce que le principe d'Archimède ?",
    answer: "Le principe d'Archimède stipule qu'un corps immergé dans un fluide subit une poussée verticale dirigée de bas en haut égale au poids du volume de fluide déplacé."
  },
  {
    question: "Qu'est-ce que l'interférence des ondes ?",
    answer: "L'interférence se produit lorsque deux ou plusieurs ondes se rencontrent et se combinent. Elle peut être constructive (les ondes s'additionnent) ou destructive (les ondes s'annulent)."
  },
  {
    question: "Qu'est-ce que le principe de superposition des ondes ?",
    answer: "Le principe de superposition stipule que lorsque deux ou plusieurs ondes se croisent, le déplacement résultant en tout point est la somme algébrique des déplacements individuels causés par chaque onde."
  },
  {
    question: "Qu'est-ce que la diffraction des ondes ?",
    answer: "La diffraction est la tendance d'une onde à contourner un obstacle ou à s'étaler après avoir traversé une ouverture. Elle est plus prononcée lorsque la taille de l'obstacle ou de l'ouverture est comparable à la longueur d'onde."
  },
  {
    question: "Quelles sont les lois de la réflexion de la lumière ?",
    answer: "1) L'angle d'incidence est égal à l'angle de réflexion. 2) Le rayon incident, le rayon réfléchi et la normale à la surface au point d'incidence sont tous dans le même plan."
  },
  {
    question: "Qu'est-ce que la réfraction de la lumière ?",
    answer: "La réfraction est le changement de direction d'une onde lorsqu'elle passe d'un milieu à un autre, causé par le changement de sa vitesse. Elle est décrite par la loi de Snell."
  },
  {
    question: "Quelle est la loi de Snell pour la réfraction ?",
    answer: "n₁sin(θ₁) = n₂sin(θ₂), où n₁ et n₂ sont les indices de réfraction des deux milieux, et θ₁ et θ₂ sont les angles d'incidence et de réfraction respectivement."
  },
  // Questions de 12e année
  {
    question: "Qu'est-ce que le champ électrique ?",
    answer: "Le champ électrique est une région de l'espace où une charge électrique ressent une force. Il est défini comme la force par unité de charge: E = F/q et s'exprime en N/C ou V/m."
  },
  {
    question: "Quelle est la loi de Coulomb ?",
    answer: "La loi de Coulomb décrit la force électrique entre deux charges ponctuelles: F = k(q₁q₂)/r², où k est la constante de Coulomb, q₁ et q₂ sont les charges, et r est la distance entre elles."
  },
  {
    question: "Comment calcule-t-on le potentiel électrique ?",
    answer: "Le potentiel électrique à une distance r d'une charge ponctuelle q est V = kq/r, où k est la constante de Coulomb. L'unité est le volt (V)."
  },
  {
    question: "Qu'est-ce qu'un condensateur ?",
    answer: "Un condensateur est un dispositif qui stocke l'énergie électrique sous forme d'un champ électrique entre deux conducteurs séparés par un isolant (diélectrique)."
  },
  {
    question: "Comment calcule-t-on la capacité d'un condensateur plan ?",
    answer: "La capacité d'un condensateur plan est C = εA/d, où ε est la permittivité du diélectrique, A est l'aire des plaques, et d est la distance entre elles."
  },
  {
    question: "Qu'est-ce que la loi d'Ohm ?",
    answer: "La loi d'Ohm stipule que le courant qui traverse un conducteur est proportionnel à la tension appliquée: I = V/R, où I est le courant, V est la tension, et R est la résistance."
  },
  {
    question: "Comment calcule-t-on la résistance équivalente de résistances en série ?",
    answer: "Pour des résistances en série, la résistance équivalente est la somme des résistances individuelles: Réq = R₁ + R₂ + R₃ + ..."
  },
  {
    question: "Comment calcule-t-on la résistance équivalente de résistances en parallèle ?",
    answer: "Pour des résistances en parallèle, l'inverse de la résistance équivalente est la somme des inverses des résistances individuelles: 1/Réq = 1/R₁ + 1/R₂ + 1/R₃ + ..."
  },
  {
    question: "Qu'est-ce que le champ magnétique ?",
    answer: "Le champ magnétique est une région de l'espace où une charge en mouvement ressent une force. Il est mesuré en tesla (T)."
  },
  {
    question: "Quelle est la force magnétique exercée sur une charge en mouvement ?",
    answer: "La force magnétique sur une charge en mouvement est F = qvBsinθ, où q est la charge, v est la vitesse, B est le champ magnétique, et θ est l'angle entre v et B."
  },
  {
    question: "Qu'est-ce que la loi de Faraday sur l'induction électromagnétique ?",
    answer: "La loi de Faraday stipule que la force électromotrice induite dans un circuit est proportionnelle au taux de variation du flux magnétique à travers le circuit: ε = -dΦ/dt."
  },
  {
    question: "Qu'est-ce que la loi de Lenz ?",
    answer: "La loi de Lenz stipule que le courant induit dans un circuit crée un champ magnétique qui s'oppose à la variation du flux magnétique qui a produit ce courant."
  },
  {
    question: "Qu'est-ce que l'effet photoélectrique ?",
    answer: "L'effet photoélectrique est l'émission d'électrons par un matériau exposé à un rayonnement électromagnétique (comme la lumière). Il illustre la nature quantique de la lumière."
  },
  {
    question: "Quelle est l'équation de Planck-Einstein pour l'effet photoélectrique ?",
    answer: "E = hf, où E est l'énergie d'un photon, h est la constante de Planck, et f est la fréquence de la lumière."
  },
  {
    question: "Qu'est-ce que la relativité restreinte ?",
    answer: "La théorie de la relativité restreinte d'Einstein est basée sur deux postulats: 1) Les lois de la physique sont les mêmes dans tous les référentiels inertiels, et 2) La vitesse de la lumière dans le vide est constante, indépendamment du mouvement de la source ou de l'observateur."
  },
  {
    question: "Quelle est l'équation d'équivalence masse-énergie d'Einstein ?",
    answer: "E = mc², où E est l'énergie, m est la masse, et c est la vitesse de la lumière dans le vide."
  },
  {
    question: "Qu'est-ce que la dilatation du temps ?",
    answer: "La dilatation du temps est un phénomène relativiste où le temps s'écoule plus lentement pour un observateur en mouvement par rapport à un observateur au repos: t = t₀/√(1-v²/c²), où t₀ est le temps propre."
  },
  {
    question: "Qu'est-ce que la contraction des longueurs ?",
    answer: "La contraction des longueurs est un phénomène relativiste où les objets en mouvement apparaissent plus courts dans la direction du mouvement: L = L₀√(1-v²/c²), où L₀ est la longueur propre."
  },
  {
    question: "Qu'est-ce que la dualité onde-particule ?",
    answer: "La dualité onde-particule suggère que toute matière et rayonnement exhibe à la fois des propriétés d'onde et de particule. Par exemple, les électrons peuvent montrer des motifs d'interférence comme des ondes."
  },
  {
    question: "Quelle est la longueur d'onde de de Broglie ?",
    answer: "La longueur d'onde de de Broglie d'une particule est λ = h/p, où h est la constante de Planck et p est la quantité de mouvement de la particule."
  },
  {
    question: "Qu'est-ce que le principe d'incertitude de Heisenberg ?",
    answer: "Le principe d'incertitude de Heisenberg stipule qu'il est impossible de connaître simultanément et avec précision la position et la quantité de mouvement d'une particule: ΔxΔp ≥ ħ/2, où ħ est la constante de Planck réduite."
  },
  {
    question: "Qu'est-ce que la fission nucléaire ?",
    answer: "La fission nucléaire est la division d'un noyau lourd en deux noyaux plus légers, accompagnée de libération d'énergie et souvent de neutrons. C'est le principe des réacteurs nucléaires."
  },
  {
    question: "Qu'est-ce que la fusion nucléaire ?",
    answer: "La fusion nucléaire est la combinaison de noyaux légers pour former un noyau plus lourd, accompagnée de libération d'énergie. C'est le processus qui alimente les étoiles comme notre soleil."
  },
  {
    question: "Qu'est-ce que la force gravitationnelle ?",
    answer: "La force gravitationnelle est une force attractive entre deux masses. Elle est donnée par la loi de la gravitation universelle de Newton: F = G(m₁m₂)/r², où G est la constante gravitationnelle."
  },
  {
    question: "Comment calcule-t-on l'accélération due à la gravité à la surface d'une planète ?",
    answer: "L'accélération due à la gravité à la surface d'une planète est g = GM/R², où G est la constante gravitationnelle, M est la masse de la planète, et R est le rayon de la planète."
  },
  {
    question: "Qu'est-ce que le moment cinétique ?",
    answer: "Le moment cinétique L = r × p, où r est le vecteur position et p est la quantité de mouvement. Pour un objet en rotation, L = Iω, où I est le moment d'inertie et ω est la vitesse angulaire."
  },
  {
    question: "Qu'est-ce que la loi de la conservation du moment cinétique ?",
    answer: "Dans un système isolé (sans couple externe), le moment cinétique total reste constant. Cette loi explique pourquoi une patineuse tourne plus vite quand elle rapproche ses bras de son corps."
  },
  {
    question: "Qu'est-ce que le mouvement de précession ?",
    answer: "La précession est le changement de l'orientation de l'axe de rotation d'un corps tournant, comme une toupie ou une planète, sous l'influence d'un couple externe."
  },
  {
    question: "Qu'est-ce que le moment d'inertie ?",
    answer: "Le moment d'inertie est une mesure de la résistance d'un objet à la rotation autour d'un axe donné. Il dépend de la distribution de masse par rapport à l'axe de rotation."
  },
  {
    question: "Comment calcule-t-on l'énergie cinétique de rotation ?",
    answer: "L'énergie cinétique de rotation est Erot = ½Iω², où I est le moment d'inertie et ω est la vitesse angulaire."
  },
  {
    question: "Qu'est-ce que la vitesse angulaire ?",
    answer: "La vitesse angulaire est le taux de variation de l'angle par rapport au temps. Elle se mesure en radians par seconde (rad/s)."
  },
  {
    question: "Quelle est la relation entre la vitesse angulaire et la vitesse linéaire ?",
    answer: "La relation entre la vitesse angulaire (ω) et la vitesse linéaire (v) est v = rω, où r est la distance de l'axe de rotation."
  },
  {
    question: "Qu'est-ce que l'accélération centripète ?",
    answer: "L'accélération centripète est l'accélération dirigée vers le centre d'une trajectoire circulaire. Elle est donnée par a = v²/r ou a = rω², où v est la vitesse, r est le rayon, et ω est la vitesse angulaire."
  },
  {
    question: "Qu'est-ce que la force centripète ?",
    answer: "La force centripète est la force qui maintient un objet en mouvement circulaire. Elle est dirigée vers le centre de la trajectoire et est donnée par F = mv²/r ou F = mrω², où m est la masse."
  },
  {
    question: "Qu'est-ce qu'un oscillateur harmonique ?",
    answer: "Un oscillateur harmonique est un système qui, lorsqu'il est déplacé de sa position d'équilibre, subit une force de rappel proportionnelle au déplacement: F = -kx, où k est la constante de rappel."
  },
  {
    question: "Comment calcule-t-on la fréquence d'un système masse-ressort ?",
    answer: "La fréquence d'un système masse-ressort est f = (1/2π)√(k/m), où k est la constante de ressort et m est la masse."
  },
  {
    question: "Qu'est-ce que le travail d'une force variable ?",
    answer: "Le travail d'une force variable est l'intégrale de F·dx le long du chemin: W = ∫F·dx. Géométriquement, c'est l'aire sous la courbe de force en fonction du déplacement."
  },
  {
    question: "Qu'est-ce que l'effet Doppler ?",
    answer: "L'effet Doppler est le changement apparent de fréquence d'une onde pour un observateur en mouvement relatif par rapport à la source. Pour une source qui s'approche, la fréquence perçue est plus élevée, et pour une source qui s'éloigne, elle est plus basse."
  },
  {
    question: "Qu'est-ce que l'onde de choc ?",
    answer: "Une onde de choc se forme lorsqu'un objet se déplace plus vite que la vitesse du son dans le milieu, créant une perturbation soudaine. C'est ce qui cause le 'bang' sonique des avions supersoniques."
  },
  {
    question: "Qu'est-ce que la vitesse de libération ?",
    answer: "La vitesse de libération est la vitesse minimale nécessaire pour qu'un objet échappe à l'attraction gravitationnelle d'un corps céleste sans propulsion supplémentaire. Pour la Terre, elle est d'environ 11,2 km/s."
  },
  {
    question: "Comment exprime-t-on la troisième loi de Kepler ?",
    answer: "La troisième loi de Kepler stipule que le carré de la période orbitale d'une planète est proportionnel au cube de sa distance moyenne au Soleil: T² ∝ r³."
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

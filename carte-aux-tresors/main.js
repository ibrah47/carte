const fs = require("fs");

function lireFichierEntree(cheminFichier) {
  const lignes = fs.readFileSync(cheminFichier, "utf8").split("\n");
  const carte = [];
  const aventuriers = [];

  lignes.forEach((ligne) => {
    if (ligne.startsWith("#")) {
      return;
    }

    const elements = ligne.split(" - ");

    switch (elements[0]) {
      case "C":
        carte.push({
          type: "C",
          largeur: parseInt(elements[2]),
          hauteur: parseInt(elements[3]),
        });
        break;

      case "M":
        carte.push({
          type: "M",
          x: parseInt(elements[2]),
          y: parseInt(elements[3]),
        });
        break;

      case "T":
        carte.push({
          type: "T",
          x: parseInt(elements[2]),
          y: parseInt(elements[3]),
          nbTresors: parseInt(elements[4]),
        });
        break;

      case "A":
        aventuriers.push({
          type: "A",
          nom: elements[1],
          x: parseInt(elements[2]),
          y: parseInt(elements[3]),
          orientation: elements[4],
          sequenceMouvement: elements[5],
        });
        break;

      default:
        break;
    }
  });

  return { carte, aventuriers };
}

function simulerMouvements(carte, aventuriers) {
  aventuriers.forEach((aventurier) => {
    for (let mouvement of aventurier.sequenceMouvement) {
      switch (mouvement) {
        case "A":
          deplacerAventurier(carte, aventurier);
          collecterTresor(carte, aventurier);
          break;

        case "G":
          tournerAGauche(aventurier);
          break;

        case "D":
          tournerADroite(aventurier);
          break;

        default:
          break;
      }
    }
  });
}

function deplacerAventurier(carte, aventurier) {
  const nouvellePosition = { x: aventurier.x, y: aventurier.y };

  switch (aventurier.orientation) {
    case "N":
      nouvellePosition.y -= 1;
      break;

    case "S":
      nouvellePosition.y += 1;
      break;

    case "E":
      nouvellePosition.x += 1;
      break;

    case "O":
      nouvellePosition.x -= 1;
      break;

    default:
      break;
  }

  if (estPositionValide(carte, nouvellePosition)) {
    aventurier.x = nouvellePosition.x;
    aventurier.y = nouvellePosition.y;
  }
}

function estPositionValide(carte, position) {
  if (
    position.x >= 0 &&
    position.y >= 0 &&
    position.x < carte[0].largeur &&
    position.y < carte[0].hauteur
  ) {
    const estMontagne = carte.some(
      (element) =>
        element.type === "M" &&
        element.x === position.x &&
        element.y === position.y,
    );

    return !estMontagne;
  }

  return false;
}

function tournerAGauche(aventurier) {
  switch (aventurier.orientation) {
    case "N":
      aventurier.orientation = "O";
      break;

    case "S":
      aventurier.orientation = "E";
      break;

    case "E":
      aventurier.orientation = "N";
      break;

    case "O":
      aventurier.orientation = "S";
      break;

    default:
      break;
  }
}

function tournerADroite(aventurier) {
  switch (aventurier.orientation) {
    case "N":
      aventurier.orientation = "E";
      break;

    case "S":
      aventurier.orientation = "O";
      break;

    case "E":
      aventurier.orientation = "S";
      break;

    case "O":
      aventurier.orientation = "N";
      break;

    default:
      break;
  }
}

function collecterTresor(carte, aventurier) {
  const caseAventurier = carte.find(
    (element) =>
      element.type === "T" &&
      element.x === aventurier.x &&
      element.y === aventurier.y,
  );

  if (caseAventurier) {
    aventurier.nbTresorsRamasses += Math.min(caseAventurier.nbTresors, 1);

    caseAventurier.nbTresors = Math.max(0, caseAventurier.nbTresors - 1);
  }
}

// Logique de simulation des mouvements
aventuriers.forEach((aventurier) => {
  for (let mouvement of aventurier.sequenceMouvement) {
    switch (mouvement) {
      case "A":
        deplacerAventurier(carte, aventurier);
        collecterTresor(carte, aventurier);
        break;

      case "G":
        tournerAGauche(aventurier);
        break;

      case "D":
        tournerADroite(aventurier);
        break;

      default:
        // Ignorer les mouvements invalides
        break;
    }
  }
});

const { carte, aventuriers } = lireFichierEntree("input.txt");

// Logique de simulation des mouvements
simulerMouvements(carte, aventuriers);

// Afficher le résultat
console.log(carte);
console.log(aventuriers);

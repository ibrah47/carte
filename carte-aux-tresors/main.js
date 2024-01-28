const fs = require("fs");

function lireFichierEntree(nomFichierEntree) {
  console.log(`Lecture du fichier: ${nomFichierEntree}`);
  const contenu = fs.readFileSync(nomFichierEntree, "utf-8");
  const lignes = contenu.split("\n");
  const donnees = {
    carte: [],
    montagnes: [],
    tresors: [],
    aventuriers: [],
  };

  for (const ligne of lignes) {
    if (ligne.trim() !== "" && !ligne.startsWith("#")) {
      const elements = ligne.trim().split(/\s+/);
      const type = elements[0];

      switch (type) {
        case "C":
          donnees.carte = elements.slice(1).map((e) => convertirCoordonnee(e));
          break;
        case "M":
          donnees.montagnes.push(
            elements.slice(1).map((e) => convertirCoordonnee(e)),
          );
          break;
        case "T":
          const axeX = convertirCoordonnee(elements[1]);
          const axeY = convertirCoordonnee(elements[2]);
          const nbTresors = convertirCoordonnee(elements[3]);
          console.log("Coordonnées trésor:", axeX, axeY, nbTresors);
          donnees.tresors.push(
            convertirCoordonneesTresor(...ligne.split(" ").slice(2)),
          );
          break;
        case "A":
          donnees.aventuriers.push(elements.slice(1));
          break;
        default:
          break;
      }
    }
  }

  console.log("Données lues:", donnees);
  return donnees;
}

function simulerMouvementsAventuriers(donnees) {
  const { carte, montagnes, tresors, aventuriers } = donnees;

  for (const aventurierData of aventuriers) {
    const [_, nom, x, __, y, ___, orientation, _____, mouvements] =
      aventurierData;
    const aventurier = {
      nom,
      position: { x: convertirCoordonnee(x), y: convertirCoordonnee(y) },
      orientation,
      mouvements: mouvements === "-" ? "" : mouvements,
      tresorsRamasses: 0,
    };

    console.log(
      `Avant mouvement - ${nom} - Aventurier ${nom} - position: `,
      aventurier.position,
    );
    simulerMouvements(aventurier, carte, montagnes, tresors);
    console.log(
      `Après mouvement - ${nom} - Aventurier ${nom} - position: `,
      aventurier.position,
    );
  }
}

function simulerMouvements(aventurier, carte, montagnes, tresors) {
  const { x, y } = aventurier.position;
  const { orientation, mouvements } = aventurier;

  for (const mouvement of mouvements) {
    switch (mouvement) {
      case "A":
        deplacerAventurier(aventurier, carte, montagnes);
        ramasserTresor(aventurier, tresors);
        break;
      case "G":
        aventurier.orientation = tournerAGauche(orientation);
        break;
      case "D":
        aventurier.orientation = tournerADroite(orientation);
        break;
      default:
        // Ignorer les mouvements inconnus
        break;
    }
  }
}

function deplacerAventurier(aventurier, carte, montagnes) {
  const { x, y } = aventurier.position;
  const { orientation } = aventurier;

  switch (orientation) {
    case "N":
      if (y > 0 && !estMontagne(x, y - 1, montagnes)) {
        aventurier.position.y--;
      }
      break;
    case "S":
      if (y < carte[1] - 1 && !estMontagne(x, y + 1, montagnes)) {
        aventurier.position.y++;
      }
      break;
    case "E":
      if (x < carte[0] - 1 && !estMontagne(x + 1, y, montagnes)) {
        aventurier.position.x++;
      }
      break;
    case "O":
      if (x > 0 && !estMontagne(x - 1, y, montagnes)) {
        aventurier.position.x--;
      }
      break;
    default:
      // Ignorer les orientations inconnues
      break;
  }
}

function ramasserTresor(aventurier, tresors) {
  const { x, y } = aventurier.position;

  for (let i = 0; i < tresors.length; i++) {
    const tresor = tresors[i];
    if (tresor.x === x && tresor.y === y) {
      aventurier.tresorsRamasses++;
      tresor.nbTresors--;
      if (tresor.nbTresors === 0) {
        tresors.splice(i, 1);
      }
      break; // Un aventurier peut ramasser au plus un trésor par case
    }
  }
}

function estMontagne(x, y, montagnes) {
  for (const montagne of montagnes) {
    const [mx, my] = montagne;
    if (mx === x && my === y) {
      return true;
    }
  }
  return false;
}

function tournerAGauche(orientation) {
  switch (orientation) {
    case "N":
      return "O";
    case "S":
      return "E";
    case "E":
      return "N";
    case "O":
      return "S";
    default:
      return orientation;
  }
}

function tournerADroite(orientation) {
  switch (orientation) {
    case "N":
      return "E";
    case "S":
      return "O";
    case "E":
      return "S";
    case "O":
      return "N";
    default:
      return orientation;
  }
}

function convertirCoordonnee(coordonnee) {
  const valeurParsee = parseInt(coordonnee);
  return isNaN(valeurParsee) ? null : valeurParsee;
}

function convertirAventuriers(nom, x, y, orientation, mouvements) {
  console.log(`Aventurier ${nom} - position: { x: ${x}, y: ${y} }`);

  const coordX = convertirCoordonnee(x);
  const coordY = convertirCoordonnee(y);

  if (!isNaN(coordX) && !isNaN(coordY)) {
    return {
      nom,
      position: { x: coordX, y: coordY },
      orientation,
      mouvements,
      tresorsRamasses: 0,
    };
  } else {
    console.log(`Coordonnées aventurier ${nom} invalides`);
    return null;
  }
}

function convertirCoordonneesTresor(x, y, nbTresors) {
  return {
    x: convertirCoordonnee(x),
    y: y === null ? null : convertirCoordonnee(y),
    nbTresors: convertirCoordonnee(nbTresors),
  };
}

function ecrireFichierSortie(nomFichierSortie, donnees) {
  const contenuSortie = donnees.carte
    .concat(donnees.montagnes, donnees.tresors, donnees.aventuriers)
    .join("\n");
  fs.writeFileSync(nomFichierSortie, contenuSortie, "utf-8");
  console.log("Résultats écrits dans le fichier:", nomFichierSortie);
}

const nomFichierEntree = "input.txt";
const nomFichierSortie = "output.txt";

const donnees = lireFichierEntree(nomFichierEntree);
simulerMouvementsAventuriers(donnees);
ecrireFichierSortie(nomFichierSortie, donnees);

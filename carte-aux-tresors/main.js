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

const { carte, aventuriers } = lireFichierEntree("input.txt");
console.log(carte);
console.log(aventuriers);

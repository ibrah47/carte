const {
  convertirCoordonnee,
  convertirAventuriers,
  convertirCoordonneesTresor,
  deplacerAventurier,
} = require("./main.js");

const assert = require("assert");

// Test pour la fonction de conversion de coordonnées
assert.strictEqual(convertirCoordonnee("1"), 1);
assert.strictEqual(convertirCoordonnee("A"), null);

// Test pour la fonction de conversion d'aventuriers
const aventurierTest = convertirAventuriers("Indiana", "1", "1", "S", "AADADA");
assert.strictEqual(aventurierTest.nom, "Indiana");
assert.deepStrictEqual(aventurierTest.position, { x: 1, y: 1 });
assert.strictEqual(aventurierTest.orientation, "S");
assert.strictEqual(aventurierTest.mouvements, "AADADA");
assert.strictEqual(aventurierTest.tresorsRamasses, 0);

// Test pour la fonction de conversion de coordonnées de trésor
const tresorTest = convertirCoordonneesTresor("1", null, "3");
assert.strictEqual(tresorTest.x, 1);
assert.strictEqual(tresorTest.y, null);
assert.strictEqual(tresorTest.nbTresors, 3);

// Test pour la fonction de déplacement d'aventurier
const aventurierTestDeplacement = {
  position: { x: 1, y: 1 },
  orientation: "S",
  mouvements: "A",
  tresorsRamasses: 0,
};
deplacerAventurier(aventurierTestDeplacement, [3, 4], [], []);
assert.deepStrictEqual(aventurierTestDeplacement.position, { x: 1, y: 2 });

console.log("Tous les tests ont réussi.");

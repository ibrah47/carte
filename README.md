# Carte aux Trésors

## Description
Ce projet simule un parcours d'aventuriers sur une carte parsemée de montagnes, de trésors, et d'autres aventuriers. Les aventuriers suivent un ensemble de mouvements définis pour explorer la carte et ramasser des trésors.

## Prérequis
- [Node.js](https://nodejs.org/) installé sur votre machine.

## Lancement du Projet
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/ibrah47/carte.git
    ```

2. Accédez au répertoire du projet :
    ```bash
    cd carte-aux-tresors
    ```

3. Installez les dépendances :
    ```bash
    npm install
    ```

4. Lancez le programme principal :
    ```bash
    node main.js
    ```

5. Consultez les résultats dans le fichier `output.txt`.

## Lancement des Tests
1. Assurez-vous d'avoir installé les dépendances :
    ```bash
    npm install
    ```

2. Exécutez les tests :
    ```bash
    node tests.js
    ```

## Structure du Code
- `main.js`: Code principal du programme.
- `tests.js`: Fichier de tests unitaires.
- `input.txt`: Fichier d'entrée avec la configuration du jeu.
- `output.txt`: Fichier de sortie avec les résultats du jeu.

## Fonctions Principales
- `lireFichierEntree(nomFichierEntree)`: Lit le fichier d'entrée et génère les données du jeu.
- `simulerMouvementsAventuriers(donnees)`: Simule les mouvements des aventuriers.
- `ecrireFichierSortie(nomFichierSortie, donnees)`: Écrit les résultats dans le fichier de sortie.

## Auteurs
Ibrahima

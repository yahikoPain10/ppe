---
id: classeur-feuilles-cellules
title: Classeur, Feuilles, cellules, adresses
sidebar_label: Classeur, Feuilles, cellules
sidebar_position: 3
---

# Classeur, Feuilles, cellules, adresses

## 1. Créer un nouveau classeur
![Créer un nouveau classeur](/nouveau-classeur.png)

## 2. L'environnement de travail
![Environnement du tableur](/excel-environnement-annote.png)

## 3. Enregistrer un classeur

import Video from '@site/src/components/Video';

<Video src="demo-enregistrer-classeur.mp4" />


## 2. L'adresse d'une cellule
![Addresse d'une cellule](/adresse_cellule_adaptive.svg)

<Video src="demo-trouver-addresse.mp4" />

<br />

<details>

import AdressesCouleursQuiz from '@site/src/components/AdressesCouleursQuiz';

<summary>Exercice d'application</summary>

<img src={require('/exercice-adresses-couleurs.png').default} width="500" alt="Exercice addresse" />
<!-- ![Exercice addresse](/exercice-adresses-couleurs.png) -->

<AdressesCouleursQuiz
  image="/exercice-adresses-couleurs.png"
  questions={[
    {
      question: "Quelle est l'adresse de la cellule entourée en **Vert** ?",
      options: ["A3", "A4", "B4", "A5"],
      answer: "A4",
    },
    {
      question: "Quelle est l'adresse de la cellule entourée en **Rouge** ?",
      options: ["C5", "B6", "C6", "D6"],
      answer: "C6",
    },
    {
      question: "Quelle est l'adresse de la cellule entourée en **Bleu** ?",
      options: ["E10", "D3", "E3", "F2"],
      answer: "E10",
    },
  ]}
/>

</details>
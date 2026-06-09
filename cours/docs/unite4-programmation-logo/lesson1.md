---
id: lesson1
title: Leçon 1 — Découverte de Logo
sidebar_label: Leçon 1 — Découverte
sidebar_position: 1
---

# Découverte de Logo

**Logo** est un langage de programmation créé dans les années 1960, conçu spécialement pour apprendre à programmer. Il utilise une **tortue graphique** que l'on déplace sur l'écran à l'aide d'instructions simples.

## La tortue

Imaginez une petite tortue posée au centre de l'écran, tenant un crayon. Chaque instruction que vous lui donnez la fait avancer, reculer ou tourner — et si son crayon est baissé, elle trace un trait.

## Les instructions de base

| Instruction | Abréviation | Effet |
|-------------|-------------|-------|
| `AVANCE n` | `AV n` | Avance de *n* pas |
| `RECULE n` | `RE n` | Recule de *n* pas |
| `DROITE n` | `DR n` | Tourne à droite de *n* degrés |
| `GAUCHE n` | `GA n` | Tourne à gauche de *n* degrés |
| `BAISSE CRAYON` | `BC` | Baisse le crayon (trace) |
| `LEVE CRAYON` | `LC` | Lève le crayon (ne trace pas) |

## Dessiner un carré

Voici comment tracer un carré de côté 100 pas :

```logo
AVANCE 100
DROITE 90
AVANCE 100
DROITE 90
AVANCE 100
DROITE 90
AVANCE 100
DROITE 90
```

La tortue tourne 4 fois de 90° et avance 4 fois : elle trace un carré parfait.

## À retenir

Un tour complet correspond à **360 degrés**. Pour tracer un triangle équilatéral, la tortue devra tourner de 120° à chaque sommet (3 × 120° = 360°).

---
id: lesson2
title: Leçon 2 — Boucles et procédures
sidebar_label: Leçon 2 — Boucles
sidebar_position: 2
---

# Boucles et procédures

Répéter des instructions manuellement devient vite fastidieux. Logo propose des outils pour automatiser les répétitions et organiser le code en blocs réutilisables.

## La boucle REPETE

`REPETE n [ instructions ]` exécute les instructions *n* fois.

### Exemple — carré simplifié

```logo
REPETE 4 [ AVANCE 100  DROITE 90 ]
```

Résultat identique à la version précédente, mais en une seule ligne.

### Exemple — cercle approximatif

```logo
REPETE 36 [ AVANCE 10  DROITE 10 ]
```

En répétant 36 fois un pas de 10 et un virage de 10°, on obtient un polygone à 36 côtés qui ressemble à un cercle.

## Les procédures

Une **procédure** est un groupe d'instructions auquel on donne un nom. On peut ensuite l'appeler autant de fois que l'on veut.

```logo
POUR CARRE :TAILLE
  REPETE 4 [ AVANCE :TAILLE  DROITE 90 ]
FIN
```

- `POUR CARRE :TAILLE` — déclare une procédure nommée `CARRE` avec un paramètre `:TAILLE`
- `FIN` — marque la fin de la procédure
- `:TAILLE` — le deux-points indique que c'est une variable

### Utilisation

```logo
CARRE 50
CARRE 100
CARRE 200
```

Chaque appel trace un carré d'une taille différente.

## Imbriquer les procédures

On peut appeler une procédure depuis une autre :

```logo
POUR MAISON
  CARRE 100
  AVANCE 100
  DROITE 30
  REPETE 3 [ AVANCE 87  DROITE 120 ]
FIN

MAISON
```

## À retenir

Les procédures rendent le code plus **lisible** et **réutilisable**. C'est le début du raisonnement algorithmique : décomposer un problème complexe en petites étapes nommées.

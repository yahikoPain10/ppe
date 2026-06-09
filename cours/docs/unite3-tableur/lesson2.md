---
id: lesson2
title: Leçon 2 — Formules et fonctions
sidebar_label: Leçon 2 — Formules
sidebar_position: 2
---

# Formules et fonctions de base

Les **formules** sont la force du tableur : elles permettent de calculer automatiquement des résultats à partir des données saisies.

## Opérations arithmétiques

| Opérateur | Signification | Exemple |
|-----------|--------------|---------|
| `+` | Addition | `=A1+B1` |
| `-` | Soustraction | `=A1-B1` |
| `*` | Multiplication | `=A1*B1` |
| `/` | Division | `=A1/B1` |
| `^` | Puissance | `=A1^2` |

## Les fonctions essentielles

Le tableur propose des centaines de fonctions prêtes à l'emploi. Voici les plus courantes :

### SOMME

Calcule la somme d'une plage de cellules.

```
=SOMME(A1:A10)
```

Additionne toutes les valeurs de A1 jusqu'à A10.

### MOYENNE

Calcule la moyenne arithmétique d'une plage.

```
=MOYENNE(B1:B20)
```

### MIN et MAX

Renvoient respectivement la valeur minimale et maximale d'une plage.

```
=MIN(C1:C50)
=MAX(C1:C50)
```

## Références relatives et absolues

Par défaut, les références sont **relatives** (ex. : `A1`) — elles s'adaptent automatiquement quand on copie la formule dans une autre cellule.

Pour **fixer** une référence et qu'elle ne change pas lors d'une copie, on utilise le signe `$` :

- `$A$1` — ligne et colonne fixes
- `A$1` — ligne fixe seulement
- `$A1` — colonne fixe seulement

## À retenir

Quand une formule affiche `#DIV/0!`, cela signifie que vous tentez de diviser par zéro. Vérifiez vos données !

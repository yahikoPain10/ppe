/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // La sidebar principale
  coursSidebar: [
    // ── Unité 3 : Tableur ───────────────────────────────────────────────────
    {
      type: 'category',
      label: 'Unité 3 : Tableur',
      collapsed: false,           // Ouvert par défaut
      items: [
        'unite3-tableur/lesson1',
        'unite3-tableur/lesson2',
      ],
    },

    // ── Unité 4 : Programmation Logo ────────────────────────────────────────
    {
      type: 'category',
      label: 'Unité 4 : Programmation Logo',
      collapsed: false,
      items: [
        'unite4-programmation-logo/lesson1',
        'unite4-programmation-logo/lesson2',
      ],
    },
  ],
};

module.exports = sidebars;

/*
 * ══════════════════════════════════════════════════════════════════════════════
 * GUIDE : Comment modifier la structure de la sidebar
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * 1) AJOUTER UNE LEÇON dans une unité existante :
 *    - Créez le fichier : docs/unite3-tableur/lesson3.md
 *    - Ajoutez 'unite3-tableur/lesson3' dans le tableau items correspondant
 *
 * 2) AJOUTER UNE NOUVELLE UNITÉ :
 *    - Ajoutez un nouvel objet { type: 'category', ... } dans coursSidebar
 *    - Exemple :
 *        {
 *          type: 'category',
 *          label: 'Unité 5 : Traitement de texte',
 *          collapsed: false,
 *          items: [
 *            'unite5-traitement-texte/lesson1',
 *          ],
 *        },
 *    - Créez le dossier : docs/unite5-traitement-texte/
 *    - Créez le fichier : docs/unite5-traitement-texte/lesson1.md
 *
 * 3) RENOMMER un élément dans la sidebar :
 *    Modifiez uniquement le champ `label`, pas le chemin du fichier.
 *
 * 4) FERMER une catégorie par défaut :
 *    Passez collapsed: true
 *
 * ══════════════════════════════════════════════════════════════════════════════
 */

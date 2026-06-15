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
        'unite3-tableur/notion-tableur',
        'unite3-tableur/classeur-feuilles-cellules',
        'unite3-tableur/saisie-donnees',
        'unite3-tableur/formules-fonctions',
        'unite3-tableur/mise-en-forme',
        'unite3-tableur/graphiques',
        'unite3-tableur/pratique-en-ligne',
      ],
    },

    // ── Unité 4 : Programmation Logo ────────────────────────────────────────
    {
      type: 'category',
      label: 'Unité 4 : Programmation Logo',
      collapsed: true,
      items: [
        'unite4-programmation-logo/primitives-base',
        'unite4-programmation-logo/pratique-en-ligne',
      ],
    },
  ],
};

module.exports = sidebars;
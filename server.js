require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const pageRoutes = require('./routes/pageRoutes');
const apiRoutes = require('./routes/apiRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Base de données ───────────────────────────────────────────────────────────
connectDB();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Moteur de templates EJS ───────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Fichiers statiques ────────────────────────────────────────────────────────

// Assets EJS communs (CSS, JS partagés entre home/eleve/prof)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Fichiers statiques publics (logo, images, etc.)  → /static
app.use('/static', express.static(path.join(__dirname, 'public/static')));

// ── Docusaurus → /cours ───────────────────────────────────────────────────────
//
// Docusaurus génère son build dans cours/build/.
// La structure du build est :
//   cours/build/index.html          → page d'accueil /cours/
//   cours/build/unite3-.../         → pages de docs
//   cours/build/assets/             → JS/CSS de Docusaurus
//   cours/build/logo.svg            → logo (copié depuis cours/static/)
//   cours/build/img/                → autres images statiques
//
// express.static sert tous les fichiers du build sous /cours/*
// Le fallback en dessous gère le routing côté client (SPA).

const COURS_BUILD = path.join(__dirname, 'cours/build');

app.use('/cours', express.static(COURS_BUILD));

// Fallback SPA : toute route /cours/* qui n'est pas un fichier statique
// renvoie index.html pour que Docusaurus gère le routing côté client.
app.get('/cours/*', (req, res) => {
  const indexPath = path.join(COURS_BUILD, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(503).send(`
        <html lang="fr"><body style="font-family:sans-serif;padding:3rem;text-align:center">
          <h2>⚠️ Docusaurus non trouvé</h2>
          <p>Lancez d'abord : <code>npm run build:cours</code></p>
          <a href="/">← Retour à l'accueil</a>
        </body></html>
      `);
    }
  });
});

// ── Routes pages EJS ──────────────────────────────────────────────────────────
app.use('/', pageRoutes);

// ── Routes API ────────────────────────────────────────────────────────────────
app.use('/api', apiRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('home', { title: 'Page non trouvée', activePage: '' });
});

// ── Gestionnaire d'erreurs global (doit être en dernier) ─────────────────────
app.use(errorHandler);

// ── Démarrage ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✓ Serveur démarré → http://localhost:${PORT}`);
  console.log(`  /        → Accueil`);
  console.log(`  /cours   → Docusaurus  (npm run build:cours requis)`);
  console.log(`  /eleve   → Espace Élève`);
  console.log(`  /prof    → Espace Prof`);
  console.log(`  /api     → API REST`);
  console.log(`  /static  → Fichiers statiques\n`);
});

module.exports = app;

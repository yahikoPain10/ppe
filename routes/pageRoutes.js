const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Accueil', activePage: 'home' });
});

router.get('/eleve', (req, res) => {
  res.render('eleve', { title: 'Espace Élève', activePage: 'eleve' });
});

router.get('/prof', (req, res) => {
  res.render('prof', { title: 'Espace Prof', activePage: 'prof' });
});

module.exports = router;
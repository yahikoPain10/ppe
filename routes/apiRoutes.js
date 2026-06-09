const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const espaceEleveController = require('../controllers/espaceEleveController');
const authMiddleware = require('../middleware/auth');

// ── Auth ──────────────────────────────────────────────────────────────────────
// POST /api/auth/login
router.post('/auth/login', authController.login);

// ── Espace Élève — public ────────────────────────────────────────────────────
// GET  /api/espace-eleve/status  → isEnabled uniquement
router.get('/espace-eleve/status', espaceEleveController.getStatus);
// POST /api/eleve/verify         → vérification du code d'accès
router.post('/eleve/verify', espaceEleveController.verifySecret);

// ── Espace Élève — prof (protégé) ────────────────────────────────────────────
// GET  /api/espace-eleve/config  → config complète
router.get('/espace-eleve/config', authMiddleware, espaceEleveController.getConfig);
// PUT  /api/espace-eleve/config  → mise à jour config
router.put('/espace-eleve/config', authMiddleware, espaceEleveController.updateConfig);

module.exports = router;
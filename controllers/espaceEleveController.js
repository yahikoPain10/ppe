const crypto = require('crypto');
const EspaceEleve = require('../models/EspaceEleve');

const sha256 = (str) => crypto.createHash('sha256').update(str).digest('hex');

// ─────────────────────────────────────────────────────────────────────────────
// Routes publiques
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/espace-eleve/status
 * Retourne uniquement si l'espace est activé (pas de données sensibles).
 */
exports.getStatus = async (req, res) => {
  try {
    const config = await EspaceEleve.findOne().lean();
    if (!config) {
      return res.status(404).json({ success: false, message: 'Configuration introuvable.' });
    }
    return res.json({ success: true, data: { isEnabled: config.isEnabled } });
  } catch (error) {
    console.error('getStatus:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

/**
 * POST /api/eleve/verify
 * Corps : { secret }
 * Vérifie le code d'accès de l'élève. Retourne le lien Google Form si correct.
 */
exports.verifySecret = async (req, res) => {
  try {
    const { secret } = req.body;

    if (!secret || !secret.trim()) {
      return res.status(400).json({ success: false, message: 'Code d\'accès requis.' });
    }

    const config = await EspaceEleve.findOne().lean();

    if (!config || !config.isEnabled) {
      return res.status(403).json({
        success: false,
        message: 'L\'espace élève est actuellement désactivé.',
      });
    }

    if (!config.secretHash) {
      return res.status(503).json({
        success: false,
        message: 'Aucun code d\'accès configuré. Contactez le professeur.',
      });
    }

    if (sha256(secret.trim()) !== config.secretHash) {
      return res.status(401).json({ success: false, message: 'Code d\'accès incorrect.' });
    }

    return res.json({
      success: true,
      data: { googleFormLink: config.googleFormLink },
    });
  } catch (error) {
    console.error('verifySecret:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Routes protégées (prof uniquement)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/espace-eleve/config  [auth requis]
 * Retourne la configuration complète (sans le hash du secret).
 */
exports.getConfig = async (req, res) => {
  try {
    const config = await EspaceEleve.findOne().lean();
    if (!config) {
      return res.status(404).json({ success: false, message: 'Configuration introuvable.' });
    }
    return res.json({
      success: true,
      data: {
        isEnabled: config.isEnabled,
        googleFormLink: config.googleFormLink,
        hasSecret: !!config.secretHash,
      },
    });
  } catch (error) {
    console.error('getConfig:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

/**
 * PUT /api/espace-eleve/config  [auth requis]
 * Corps : { isEnabled?, googleFormLink?, secret? }
 * Met à jour la configuration. Si secret est fourni, il est hashé avant stockage.
 */
exports.updateConfig = async (req, res) => {
  try {
    const { isEnabled, googleFormLink, secret } = req.body;
    const update = {};

    if (typeof isEnabled === 'boolean') update.isEnabled = isEnabled;
    if (googleFormLink !== undefined) update.googleFormLink = googleFormLink.trim();
    if (secret && secret.trim()) update.secretHash = sha256(secret.trim());

    const config = await EspaceEleve.findOneAndUpdate(
      {},
      { $set: update },
      { new: true, upsert: true }
    );

    return res.json({
      success: true,
      message: 'Configuration mise à jour.',
      data: {
        isEnabled: config.isEnabled,
        googleFormLink: config.googleFormLink,
        hasSecret: !!config.secretHash,
      },
    });
  } catch (error) {
    console.error('updateConfig:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};
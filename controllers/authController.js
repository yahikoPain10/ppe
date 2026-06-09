const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/** Hash une chaîne en SHA-256 (retourne une chaîne hex minuscule) */
const sha256 = (str) => crypto.createHash('sha256').update(str).digest('hex');

/**
 * POST /api/auth/login
 * Corps : { username, password }
 * Retourne un JWT si les credentials correspondent aux variables d'environnement.
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nom d\'utilisateur et mot de passe requis.',
      });
    }

    const hashedPassword = sha256(password);

    const usernameOk = username === process.env.PROF_USERNAME;
    const passwordOk = hashedPassword === process.env.PROF_PASSWORD_SHA256?.toLowerCase();

    if (!usernameOk || !passwordOk) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects.',
      });
    }

    const token = jwt.sign(
      { username, role: 'prof' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Connexion réussie.',
      token,
    });
  } catch (error) {
    console.error('Erreur login:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};
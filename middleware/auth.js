const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification JWT.
 * Attend un header : Authorization: Bearer <token>
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Accès refusé. Token manquant.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Token invalide ou expiré.',
    });
  }
};

module.exports = authMiddleware;
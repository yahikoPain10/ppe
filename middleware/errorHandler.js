/**
 * middleware/errorHandler.js
 * Gestionnaire d'erreurs global pour Express.
 * À monter en dernier dans server.js : app.use(errorHandler)
 */

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isDev = process.env.NODE_ENV === 'development';

  console.error(`✗ [${statusCode}] ${req.method} ${req.url} —`, err.message);
  if (isDev) console.error(err.stack);

  // Réponses API (JSON)
  if (req.path.startsWith('/api') || req.headers.accept?.includes('application/json')) {
    return res.status(statusCode).json({
      success: false,
      message: isDev ? err.message : 'Une erreur serveur est survenue.',
      ...(isDev && { stack: err.stack }),
    });
  }

  // Réponses HTML (pages EJS)
  res.status(statusCode).send(`
    <html lang="fr">
      <head><meta charset="UTF-8"><title>Erreur ${statusCode}</title></head>
      <body style="font-family:sans-serif;text-align:center;padding:4rem">
        <h1>Erreur ${statusCode}</h1>
        <p>${isDev ? err.message : 'Une erreur inattendue est survenue.'}</p>
        <a href="/">← Retour à l'accueil</a>
      </body>
    </html>
  `);
};

module.exports = errorHandler;

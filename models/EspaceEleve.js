const mongoose = require('mongoose');

/**
 * Document unique qui stocke la configuration de l'espace élève.
 * Un seul document existe dans cette collection.
 */
const espaceEleveSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: Boolean,
      default: false,
    },
    googleFormLink: {
      type: String,
      default: '',
      trim: true,
    },
    // Le code d'accès élève est stocké hashé (SHA-256)
    secretHash: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EspaceEleve', espaceEleveSchema);
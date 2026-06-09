require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const EspaceEleve = require('../models/EspaceEleve');

async function initDb() {
  try {
    await connectDB();

    const existing = await EspaceEleve.findOne();

    if (!existing) {
      await EspaceEleve.create({
        isEnabled: false,
        googleFormLink: '',
        secretHash: '',
      });
      console.log('✓ Document de configuration créé (espace élève désactivé par défaut).');
    } else {
      console.log('✓ Document déjà existant — aucune modification.');
    }
  } catch (error) {
    console.error('✗ Erreur lors de l\'initialisation :', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('✓ Connexion MongoDB fermée.');
  }
}

initDb();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setStringType = (maxLength) => ({ type: String, required: true, maxlength: maxLength })

// On initialise un nouveau schéma de données pour le modèle Portfolio,
// on configure les contraintes des champs avec des objets 
// ou des types en attributs des champs
const portfolioSchema = new Schema({
  userId: setStringType(512),
  title: setStringType(256),
  company: setStringType(256),
  location: setStringType(128),
  position: setStringType(256),
  description: setStringType(2048),
  startDate: { type: Date, required: true},
  endDate: Date
});

// On exporte le modèle
module.exports = mongoose.model('Portfolio', portfolioSchema);

const env = require('./env-config.js');

// Informe l'application Next.js que les variables 
// d'environnements se trouvent dans le fichier en-config.js
module.exports = {
  presets: ['next/babel'],
  plugins: [['transform-define', env]]
}

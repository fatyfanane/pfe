// models/DemandeDevis.js
const mongoose = require('mongoose');

const demandeDevisSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nom: { type: String, required: true },
  origine: { type: String, required: true }, // ✅ champ ajouté
  details_marchandise: { type: String, required: true },
  mode_transport: { type: String, enum: ['maritime', 'aérien', 'routier'], required: true },
  destination: { type: String, required: true },
  statut: { type: String, enum: ['en_attente', 'validée', 'refusée'], default: 'en_attente' },
  date_demande: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DemandeDevis', demandeDevisSchema);

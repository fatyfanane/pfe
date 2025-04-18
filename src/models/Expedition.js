const mongoose = require('mongoose');

const expeditionSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  demande_devis_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DemandeDevis', required: true },

  origine: { type: String, required: true },
  destination: { type: String, required: true },
  details_marchandise: { type: String, required: true },
  mode_transport: { type: String, enum: ['maritime', 'aérien', 'routier'], required: true },

  code_suivi: { type: String, unique: true },
  statut: { type: String, enum: ['préparée', 'en_cours', 'livrée'], default: 'préparée' },
  date_expedition: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expedition', expeditionSchema);

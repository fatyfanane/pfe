const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  demande_devis_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DemandeDevis', required: true },

  nom: { type: String, required: true },
  origine: { type: String, required: true }, // ✅ Ajout du champ origine
  details_marchandise: { type: String, required: true },
  mode_transport: { type: String, enum: ['maritime', 'aérien', 'routier'], required: true },
  destination: { type: String, required: true },

  montant: { type: Number, required: true },
  statut: { type: String, enum: ['en_attente', 'payée', 'annulée'], default: 'en_attente' },
  date_emission: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Facture', factureSchema);

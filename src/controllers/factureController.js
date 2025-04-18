const Facture = require('../models/Facture');
const DemandeDevis = require('../models/DemandeDevis');

// Créer une facture avec récupération automatique du client depuis la demande de devis
exports.createFacture = async (req, res) => {
  try {
    const { demande_devis_id, montant } = req.body;

    // Récupérer la demande de devis
    const devis = await DemandeDevis.findById(demande_devis_id);
    if (!devis) return res.status(404).json({ message: 'Demande de devis introuvable' });

    // Créer la facture avec les infos du devis
    const facture = await Facture.create({
      client_id: devis.client_id,
      demande_devis_id,
      nom: devis.nom,
      origine: devis.origine, // ✅ Ajout ici
      montant,
      details_marchandise: devis.details_marchandise,
      mode_transport: devis.mode_transport,
      destination: devis.destination
    });

    res.status(201).json(facture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer toutes les factures
// Récupérer toutes les factures (admin => tout, client => ses propres factures)
exports.getAllFactures = async (req, res) => {
    try {
      let factures;
  
      if (req.user.role === 'admin') {
        factures = await Facture.find().populate('client_id demande_devis_id');
      } else {
        factures = await Facture.find({ client_id: req.user._id }).populate('client_id demande_devis_id');
      }
  
      res.status(200).json(factures);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Récupérer une facture par ID
exports.getFactureById = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id).populate('client_id demande_devis_id');
    if (!facture) return res.status(404).json({ message: 'Facture non trouvée' });
    res.status(200).json(facture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une facture
exports.updateFacture = async (req, res) => {
  try {
    const updated = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une facture
exports.deleteFacture = async (req, res) => {
  try {
    await Facture.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Facture supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

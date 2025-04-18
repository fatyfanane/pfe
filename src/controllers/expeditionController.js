const Expedition = require('../models/Expedition');
const DemandeDevis = require('../models/DemandeDevis');
const crypto = require('crypto'); // pour générer un code de suivi

// ✅ Empêche la duplication d'expédition
exports.createExpedition = async (req, res) => {
  try {
    const { demande_devis_id, origine } = req.body;

    // 1. Vérifier que la demande existe
    const devis = await DemandeDevis.findById(demande_devis_id);
    if (!devis) return res.status(404).json({ message: 'Demande de devis introuvable' });

    // 2. Vérifier si une expédition existe déjà pour cette demande
    const existingExpedition = await Expedition.findOne({ demande_devis_id });
    if (existingExpedition) {
      return res.status(400).json({ message: 'Une expédition a déjà été créée pour cette demande.' });
    }

    // 3. Créer l’expédition à partir des données du devis
    const expedition = await Expedition.create({
      client_id: devis.client_id,
      demande_devis_id,
      origine,
      destination: devis.destination,
      details_marchandise: devis.details_marchandise,
      mode_transport: devis.mode_transport,
      code_suivi: crypto.randomBytes(6).toString('hex')
    });

    res.status(201).json(expedition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/expeditions/suivi/:code
exports.getExpeditionByCode = async (req, res) => {
    try {
      const expedition = await Expedition.findOne({ code_suivi: req.params.code }).populate('client_id demande_devis_id');
      if (!expedition) {
        return res.status(404).json({ message: 'Aucune expédition trouvée avec ce code.' });
      }
      res.status(200).json(expedition);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// ✅ Récupérer toutes les expéditions
exports.getAllExpeditions = async (req, res) => {
    try {
      let expeditions;
  
      if (req.user.role === 'admin') {
        // Admin : toutes les expéditions
        expeditions = await Expedition.find().populate('client_id demande_devis_id');
      } else {
        // Client : seulement ses expéditions
        expeditions = await Expedition.find({ client_id: req.user._id }).populate('client_id demande_devis_id');
      }
  
      res.status(200).json(expeditions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.getExpeditionById = async (req, res) => {
  try {
    const expedition = await Expedition.findById(req.params.id).populate('client_id demande_devis_id');
    if (!expedition) return res.status(404).json({ message: 'Expédition introuvable' });
    res.status(200).json(expedition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateExpedition = async (req, res) => {
    try {
      const updated = await Expedition.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: "Expédition introuvable" });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
// PUT /api/expeditions/:id
exports.updateExpeditionStatus = async (req, res) => {
    try {
      const { statut } = req.body;
      if (!['préparée', 'en_cours', 'livrée'].includes(statut)) {
        return res.status(400).json({ message: 'Statut invalide' });
      }
  
      const expedition = await Expedition.findByIdAndUpdate(
        req.params.id,
        { statut },
        { new: true }
      );
  
      if (!expedition) {
        return res.status(404).json({ message: 'Expédition non trouvée' });
      }
  
      res.status(200).json({ message: 'Statut mis à jour avec succès', expedition });
    } catch (err) {
      console.error('[Erreur updateExpeditionStatus]', err);
      res.status(500).json({ error: err.message });
    }
  };
    
const DemandeDevis = require('../models/DemandeDevis');
const Facture = require('../models/Facture');

// Créer une demande de devis
exports.createDemande = async (req, res) => {
  try {
    const { nom, origine, details_marchandise, mode_transport, destination } = req.body;

    const demande = await DemandeDevis.create({
      client_id: req.user._id,
      nom,
      origine,
      details_marchandise,
      mode_transport,
      destination
    });

    res.status(201).json(demande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer toutes les demandes (avec filtre nom pour admin)
exports.getAllDemandes = async (req, res) => {
  try {
    let demandes;

    if (req.user.role === 'admin') {
      const filter = {};
      if (req.query.nom) {
        filter.nom = { $regex: req.query.nom, $options: 'i' };
      }

      demandes = await DemandeDevis.find(filter).populate('client_id');
    } else {
      demandes = await DemandeDevis.find({ client_id: req.user._id });
    }

    res.status(200).json(demandes);
  } catch (err) {
    console.error('[❌ Erreur getAllDemandes]', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une demande par ID
exports.getDemandeById = async (req, res) => {
  try {
    const demande = await DemandeDevis.findById(req.params.id).populate('client_id');
    if (!demande) return res.status(404).json({ message: 'Demande introuvable' });
    res.status(200).json(demande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Valider ou refuser une demande
exports.updateDemande = async (req, res) => {
  try {
    const { statut, montant } = req.body;

    const demande = await DemandeDevis.findById(req.params.id);
    if (!demande) return res.status(404).json({ message: 'Demande introuvable' });

    let facture = null;

    if (statut === 'validée' && montant) {
      console.log('[🧾 Création facture pour demande]', demande);

      try {
        facture = await Facture.create({
          client_id: demande.client_id,
          demande_devis_id: demande._id,
          nom: demande.nom,
          montant,
          origine: demande.origine, // ✅ Ajout du champ origine
          details_marchandise: demande.details_marchandise,
          mode_transport: demande.mode_transport,
          destination: demande.destination
        });
      } catch (err) {
        console.error('[❌ Erreur lors de la création de la facture]', err.message);
        return res.status(500).json({ error: 'Erreur lors de la création de la facture' });
      }
    }

    demande.statut = statut;
    await demande.save();

    res.status(200).json({
      message: 'Demande mise à jour',
      demande,
      facture
    });
  } catch (err) {
    console.error('[Erreur updateDemande]', err);
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une demande
exports.deleteDemande = async (req, res) => {
  try {
    await DemandeDevis.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Demande supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

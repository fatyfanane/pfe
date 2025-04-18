const express = require('express');
const router = express.Router();
const controller = require('../controllers/factureController');
const auth = require('../middlewares/authMiddleware');

// ✅ Créer une facture (admin ou système)
router.post('/', auth, controller.createFacture);

// ✅ Lire toutes les factures (admin ou client)
router.get('/', auth, controller.getAllFactures);

// ✅ Lire une facture par ID
router.get('/:id', auth, controller.getFactureById);

// ✅ Modifier une facture
router.put('/:id', auth, controller.updateFacture);

// ✅ Supprimer une facture
router.delete('/:id', auth, controller.deleteFacture);

module.exports = router;

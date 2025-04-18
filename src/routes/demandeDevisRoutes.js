const express = require('express');
const router = express.Router();
const controller = require('../controllers/demandeDevisController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.createDemande); // ✅ sécurisé
router.get('/', auth, controller.getAllDemandes);

router.get('/:id', auth, controller.getDemandeById);
router.put('/:id', auth, controller.updateDemande);
router.delete('/:id', auth, controller.deleteDemande);

module.exports = router;

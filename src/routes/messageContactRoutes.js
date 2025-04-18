const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageContactController');
const auth = require('../middlewares/authMiddleware');

// ✅ Envoyer un message (client connecté)
router.post('/', auth, controller.createMessage);

// ✅ Voir tous les messages (admin)
router.get('/', auth, controller.getAllMessages);

// ✅ Voir un message par ID
router.get('/:id', auth, controller.getMessageById);

// ✅ Supprimer un message (admin)
router.delete('/:id', auth, controller.deleteMessage);

module.exports = router;

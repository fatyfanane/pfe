const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/register/client', authController.registerAsClient);
router.post('/login', authController.login);
// Dans users.routes.js





module.exports = router;
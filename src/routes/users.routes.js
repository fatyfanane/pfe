const express = require('express');
const auth = require('../middlewares/authMiddleware');


const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getCurrentUser
} = require('../controllers/users.controller');

// ✅ Récupérer tous les utilisateurs
router.get('/', getAllUsers);

// ✅ Modifier le rôle
router.put('/:id/role', updateUserRole);

// ✅ Supprimer un utilisateur
router.delete('/:id', deleteUser);


router.get('/me', auth, getCurrentUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
  deleteUser
} = require('../controllers/users.controller');

// ✅ Récupérer tous les utilisateurs
router.get('/', getAllUsers);

// ✅ Modifier le rôle
router.put('/:id/role', updateUserRole);

// ✅ Supprimer un utilisateur
router.delete('/:id', deleteUser);

module.exports = router;
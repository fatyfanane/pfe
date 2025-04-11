const User = require('../models/User');

// ✅ Liste des utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Erreur lors du chargement des utilisateurs' });
  }
};

// ✅ Modifier le rôle
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✅ Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser,
};
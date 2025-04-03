const getAllUsers = (req, res) => {
    res.json({ message: 'Liste des utilisateurs' });
};

module.exports = { getAllUsers };

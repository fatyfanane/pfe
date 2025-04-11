const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// INSCRIPTION - version avec champ role fourni
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'Utilisateur enregistré', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// INSCRIPTION - version simplifiée sans champ role (role par défaut : client)
exports.registerAsClient = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role: 'client' });
    res.status(201).json({ message: 'Client enregistré', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// CONNEXION
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
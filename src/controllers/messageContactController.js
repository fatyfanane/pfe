const MessageContact = require('../models/MessageContact');
const User = require('../models/User');

// Créer un message contact (client connecté)
exports.createMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const client = await User.findById(req.user._id);

    const nouveauMessage = await MessageContact.create({
      client_id: req.user._id,
      nom: client.name,
      email: client.email,
      message
    });

    res.status(201).json(nouveauMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire tous les messages (admin)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await MessageContact.find().populate('client_id');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire un message par ID
exports.getMessageById = async (req, res) => {
  try {
    const msg = await MessageContact.findById(req.params.id).populate('client_id');
    if (!msg) return res.status(404).json({ message: 'Message non trouvé' });
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un message (admin)
exports.deleteMessage = async (req, res) => {
  try {
    await MessageContact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Message supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const mongoose = require('mongoose');

const messageContactSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nom: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date_envoi: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessageContact', messageContactSchema);

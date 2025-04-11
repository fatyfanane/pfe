require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// 🔧 Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// 🔌 Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connexion MongoDB réussie'))
.catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));

// 📦 Import des routes
const authRoutes = require('./routes/authRoutes');   // Authentification
const userRoutes = require('./routes/users.routes');  // Utilisateurs

// 🚏 Enregistrement des routes
app.use('/api/auth', authRoutes);     // /api/auth/register, /api/auth/login
app.use('/api/users', userRoutes);    // /api/users, /api/users/:id/role

// 🧪 Route test
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API Karla Trans 🚛');
});

// 🚀 Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
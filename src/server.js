require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Import correct des routes
const shipmentRoutes = require('./routes/shipments.routes');
const userRoutes = require('./routes/users.routes');

// Vérifie ici que les routes sont bien des fonctions
console.log(typeof shipmentRoutes); // Devrait afficher "function"
console.log(typeof userRoutes); // Devrait afficher "function"

// Utilisation des routes
app.use('/api/shipments', shipmentRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Bienvenue sur l’API de Karla Trans 🚛');
});


// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

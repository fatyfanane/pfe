const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('✅ Connexion à la base de données réussie'))
    .catch(err => console.error('❌ Erreur de connexion :', err));

module.exports = sequelize;

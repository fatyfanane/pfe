const getAllShipments = (req, res) => {
    res.json({ message: 'Liste des expéditions' });
};

module.exports = { getAllShipments }; // Export sous forme d’objet, car on peut ajouter d'autres fonctions

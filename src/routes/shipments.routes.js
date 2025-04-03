const express = require('express');
const router = express.Router();
const { getAllShipments } = require('../controllers/shipments.controller');

router.get('/', getAllShipments);

module.exports = router; // Assure-toi d'exporter `router` et non `{ router }`

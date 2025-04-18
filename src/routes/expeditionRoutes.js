const express = require('express');
const router = express.Router();
const controller = require('../controllers/expeditionController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.createExpedition);
router.get('/', auth, controller.getAllExpeditions);
router.get('/:id', auth, controller.getExpeditionById);
router.get('/suivi/:code', controller.getExpeditionByCode);
router.put('/:id', controller.updateExpedition);
router.put('/:id', auth, controller.updateExpeditionStatus);


module.exports = router;

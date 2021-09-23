const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/info', UserController.showInfo);

router.post('/info', UserController.editInfo);

router.get('/purchases', UserController.showPurchases);

module.exports = router;

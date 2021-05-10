const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');

// router.get('/', cartController.totalCost);
router.get('/', cartController.showCart);

module.exports = router;
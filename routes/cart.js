const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');

router.patch('/update-state', cartController.updateState);
router.patch('/delete', cartController.delete)
router.patch('/update', cartController.update);
router.get('/', cartController.showCart);

module.exports = router;
const express = require('express');
const router = express.Router();
const catalogController = require('../app/controllers/CatalogController');

// catalogController.index
router.get('/apple',catalogController.brandApple);
router.get('/A-Z', catalogController.nameAtoZ);
router.get('/Z-A', catalogController.nameZtoA);
router.get('/cost-low-to-high', catalogController.costLowToHigh);
router.get('/cost-high-to-low', catalogController.costHighToLow);
router.get('/product/:slug', catalogController.show);
router.get('/', catalogController.index);

module.exports = router;
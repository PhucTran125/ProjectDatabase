const express = require('express');
const router = express.Router();
const catalogController = require('../app/controllers/CatalogController');

// catalogController.index
router.get('/collections/:cate', catalogController.filterByCategory);
router.patch('/byBrand', catalogController.searchByBrand);
router.get('/apple',catalogController.brandApple);
router.patch('/all', catalogController.sortBy);
router.patch('/filter', catalogController.filterProduct);
// router.get('/A-Z', catalogController.nameAtoZ);
// router.get('/Z-A', catalogController.nameZtoA);
// router.get('/cost-low-to-high', catalogController.costLowToHigh);
// router.get('/cost-high-to-low', catalogController.costHighToLow);
router.get('/product/:slug', catalogController.show);
router.get('/', catalogController.index);

module.exports = router;
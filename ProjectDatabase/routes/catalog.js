const express = require('express');
const router = express.Router();
const catalogController = require('../app/controllers/CatalogController');

// catalogController.index
router.get('/:slug', catalogController.show);
router.get('/', catalogController.index);

module.exports = router;
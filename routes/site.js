const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

// siteController.home
router.get('/pages-info', siteController.pages);
router.get('/blog', siteController.blog);
router.get('/login', siteController.login);
router.get('/', siteController.home);

module.exports = router;
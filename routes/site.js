const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

// siteController.home
router.get('/info',(req,res) =>{
    res.render('information');
});
router.get('/shipping', (req,res) =>{
    res.render('shipping');
});
router.get('/payment',(req,res) =>{
    res.render('payment');
});
router.post('/shipping', (req,res) =>{
    res.render('shipping');
});
router.post('/payment',(req,res) =>{
    res.render('payment');
});
router.get('/detail', (req, res) => {
    res.render('product-detail');
});
router.get('/pages-info', siteController.pages);
router.get('/blog', siteController.blog);
router.get('/login', siteController.login);
router.get('/', siteController.home);

module.exports = router;
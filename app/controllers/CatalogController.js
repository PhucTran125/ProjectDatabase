const Product = require('../models/Product');

class CatalogController {
    //[GET] /catalog
    index(req, res, next) {
        Product.getAllProduct(function(err, rows){
            if(err) res.json(err);
            else {
               res.render('product', {rows});
            }
        });
    };
    //[GET] /catalog/cost-low-to-high
    costLowToHigh(req, res) {
        Product.sortProductByCostAsc(function(err, rows){
            if(err) res.json(err);
            else {
                res.render('product', {rows});
            }
        });
    };
    //[GET] /catalog/cost-high-to-low
    costHighToLow(req, res) {
        Product.sortProductByCostDesc(function(err, rows){
            if(err) res.json(err);
            else {
                res.render('product', {rows});
            }
        });
    };
    //[GET] /catalog/A-Z
    nameAtoZ(req, res) {
        Product.sortProductByNameAsc(function(err, rows) {
            if(err) res.json(err);
            else {
                res.render('product', {rows});
            }
        })
    };
    //[GET] /catalog/Z-A
    nameZtoA(req, res) {
        Product.sortProductByNameDesc(function(err, rows) {
            if(err) res.json(err);
            else {
                res.render('product', {rows});
            }
        })
    };
    //[GET] /catalog/product/slug
    show(req, res) {
        console.log("phuc beo");
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        var slug = fullUrl.split("/").pop();
        Product.getProductBySlug(slug, function(err, rows) {
            if(err) res.json(err);
            else {
                res.render('product-detail', {rows});
            }
        })
    };  
};

module.exports = new CatalogController;
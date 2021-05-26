const { Callbacks } = require('jquery');
const Product = require('../models/Product');

class CatalogController {
    //[GET] /catalog
    index(req, res, next) {
        Product.getAllProduct(function(err,rows){
            if(err) res.json(err);
            else {
                var brandname=new Set(rows.map(a => a.Brand_name));
                var brands= Array.from(brandname);
                brands.sort();
                res.render('product', {rows:rows,brands:brands});

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
    //[GET] /catalog/apple
    brandApple(req, res){
        Product.shopbyBrandApple(function(err, rows){
            if(err) res.json(err);
            else {
                res.render('product', {rows});
            }
        });
    }

    //[GET] /catalog/product/slug
    show(req, res) {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        var slug = fullUrl.split("/").pop();
        Product.getProductBySlug(slug, function(err, rows) {
            if(err) res.json(err);
            else {
                var imageUrl = rows[0].url.split("|");
                var descript=rows[0].ProductDesc.split("|");

                var typecate=rows[0].Category_name;
                var cate_arr=[];
                function ex(callback){

                    Product.getProductByCategory(typecate, function(err,arr){
                        if(err) res.json(err);
                        else{
                            for(var i=0;i<arr.length;i++){
                                if(arr[i].ProductID!=rows[0].ProductID){
                                    cate_arr.push(arr[i]);
                                }
                            }
                            callback(cate_arr);
                        }
                    });
                }
                ex(function(cate_arr){
                    res.render('product-detail', {rows: rows, imageUrl: imageUrl,cate_arr:cate_arr, descript:descript});
                });
 
            }
        })
    };

};

module.exports = new CatalogController;
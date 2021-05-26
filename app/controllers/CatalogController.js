const { response } = require('express');
const { get } = require('../../routes/catalog');
const Product = require('../models/Product');
// Create global variable for category
const cate = [];
Product.getAllCategory(function(err, cates){
    if(err) console.log(err);
    for(let i = 0; i < cates.length; i++) {
        cate[i] = cates[i];
    }
});
const product = [];
Product.getAllProduct(function(err, rows){
    if(err) console.log(err);
    else {
        for(let i = 0; i < rows.length; i++) {
            product[i] = rows[i];
        }
    }
});

class CatalogController {
    //[GET] /catalog
    index(req, res, next) {
            Product.getAllProduct(function(err, rows){
                if(err) res.json(err);
                else {
                    var brand = [];
                    var newBrand = [];
                    for (let i = 0; i < rows.length; i++) {
                        brand.push(rows[i].Brand_name);
                        if (newBrand.indexOf(brand[i]) == -1) {
                            newBrand.push(brand[i]);
                        }
                    }
                    newBrand.sort();
                    res.render('product', {rows: rows, cate: cate, brand: newBrand});
                }
            });
        // }
    };
    //[PATCH] /catalog/filter
    filterProduct(req, res) {
        var brand = req.body.brand;
        var price = req.body.price;
        var color = req.body.color;
        if (brand.length == 0 && price.length == 0 && color.length  == 0) {
            res.json(product);
        } else {
            var result = product;
            console.log(result.length)
            if (brand.length != 0) {
                result = result.filter(item => item.Brand_name == "");
                for (let i = 0; i < brand.length; i++) {
                    for (let j = 0; j < product.length; j++) {
                        if (product[j].Brand_name === brand[i])
                            result.push(product[j]);
                    }  
                }
            }
            if (price.length != 0) {
                for (let i = 0; i < price.length; i++) {
                    var a = price[i].split("-")[0];
                    var b = price[i].split("-")[1];
                    for (let j = 0; j < result.length; j++) {
                        if (result[j].Price < a && result[j].Price > b) {
                            result = result.filter(item => item != result[j]);
                        }
                    }
                }
            }
            if (color.length != 0) {
                for (let i = 0; i < color.length; i++) {
                    for (let j = 0; j < result.length; j++) {
                        if (result[j].Color.toLowerCase().includes(color[i]) == false) {
                            result = result.filter(item => item != result[j]);
                        }
                    }
                }
            }
            res.json(result);
        }
    }

    //[PATCH] /catalog/:affect
    sortBy(req, res) {
        var typeSort = req.body.affect;
        var slug = req.body.url.split("/").pop();
        // const queryString = window.location.search;

        // const urlParams = new URLSearchParams(queryString);

        // const page_type = urlParams.get('sort_by')

        // console.log(page_type);
        // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        // let paramString = fullUrl.split('?')[1];
        // let queryString = new URLSearchParams(paramString);
        // console.log(queryString.get('sort_by'))
        if (slug == "catalog") {
            if (typeSort == "PriceAsc") {
                Product.sortProductByCostAsc(function(err, rows){
                    if(err) res.json(err);
                    else {
                        res.json(rows);
                    }
                })
            } else if (typeSort == "PriceDesc") {
                Product.sortProductByCostDesc(function(err, rows){
                    if(err) res.json(err);
                    else {
                        res.json(rows);
                    }
                })
            } else if (typeSort == "AtoZ") {
                Product.sortProductByNameAsc(function(err, rows) {
                    if(err) res.json(err);
                    else {
                        res.json(rows);
                    }
                })
            } else if (typeSort == "ZtoA") {
                Product.sortProductByNameDesc(function(err, rows) {
                    if(err) res.json(err);
                    else {
                        res.json(rows);
                    }
                })
            } else if (typeSort == "DateOldToNew") {
                console.log("DateOldToNew")
            } 
            else {
                console.log("DateNewToOld")
            }
        } else {
            slug = slug.split('-').join(' ');
            Product.getProductByCategory(slug, function(err, rows){
                if(err) res.json(err);
                else {
                    if (typeSort == "PriceAsc") {
                        rows.sort((a, b) => (a.Price > b.Price) ? 1 : -1);
                        res.json(rows);
                    }
                    if (typeSort == "PriceDesc") {
                        rows.sort((a, b) => (a.Price < b.Price) ? 1 : -1);
                        res.json(rows);
                    }
                    if (typeSort == "AtoZ") {
                        rows.sort((a, b) => (a.ProductName.toLowerCase() > b.ProductName.toLowerCase()) ? 1 : -1);
                        res.json(rows);
                    }
                    if (typeSort == "ZtoA") {
                        rows.sort((a, b) => (a.ProductName.toLowerCase() < b.ProductName.toLowerCase()) ? 1 : -1);
                        res.json(rows);
                    }
                    if (typeSort == "DateOldToNew") {
                        console.log("DateOldToNew")
                    }
                    if (typeSort == "DateNewToOld") {
                        console.log("DateNewToOld")
                    }
                }
            })
        }
    }
    //[GET] /catalog/apple
    brandApple(req, res){
        Product.shopbyBrandApple(function(err, rows){
            if(err) res.json(err);
            else {
                res.render('product', {rows: rows, cate: cate});
            }
        });
    }
    //[PATCH] /byBrand
    searchByBrand(req, res) {
        if (req.body.id.length != 0) {
            var result = []; 
            for (let i = 0; i < req.body.id.length; i++) {
                Product.getProductByBrand(req.body.id[i], function(err, rows) {
                    if(err) console.log(err);
                    for (let j = 0; j < rows.length; j++) {
                        result.push(rows[j]);
                    }
                })
            }
            function output() {
                res.json(result);
            }
            setTimeout(output, 10);
        } else {
            res.json(product);
        }
    }
    //[GET] /collections/:cate
    filterByCategory(req, res) {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        var slug = fullUrl.split("/").pop();
        slug = slug.split('-').join(' ');
        Product.getProductByCategory(slug, function(err, rows){
            if(err) res.json(err);
            else {
                res.render('product', {rows: rows, cate: cate});
            }
        })
    }

    //[GET] /catalog/product/slug
    show(req, res) {
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
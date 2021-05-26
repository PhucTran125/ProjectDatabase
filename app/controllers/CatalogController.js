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
var afterFilterCate = product;
var afteMultiFiter = []; // array of object after filter by brand || price || color

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
        var slug = req.body.url.split("/").pop();
        if (slug == "catalog") var result = product;
        else var result = afterFilterCate;
        if (brand.length != 0) {
            var afterFilterBrand = [];
            for (let i = 0; i < brand.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[j].Brand_name === brand[i])
                        afterFilterBrand.push(result[j]);
                }  
            }
            result = afterFilterBrand;
        }
        if (price.length != 0) {
            var afterFilterPrice = [];
            for (let i = 0; i < price.length; i++) {
                var a = price[i].split("-")[0];
                var b = price[i].split("-")[1];
                for (let j = 0; j < result.length; j++) {
                    if (result[j].Price >= a && result[j].Price <= b) {
                        afterFilterPrice.push(result[j]);
                    }
                }
            }
            result = afterFilterPrice;
        }
        if (color.length != 0) {
            var afterFilterColor = [];
            for (let i = 0; i < color.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[j].Color.toLowerCase().includes(color[i]) == true) {
                        afterFilterColor.push(result[j]);
                    }
                }
            }
            result = afterFilterColor;
        }
        afteMultiFiter = result;
        res.json(result);
    }

    //[PATCH] /catalog/:affect
    sortBy(req, res) {
        var typeSort = req.body.affect;
        if (afteMultiFiter.length != 0) var rows = afteMultiFiter;
        else rows = product;
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
        // var slug = req.body.url.split("/").pop();
        // if (slug == "catalog") {
        //     if (typeSort == "PriceAsc") {
        //         Product.sortProductByCostAsc(function(err, rows){
        //             if(err) res.json(err);
        //             else {
        //                 res.json(rows);
        //             }
        //         })
        //     } else if (typeSort == "PriceDesc") {
        //         Product.sortProductByCostDesc(function(err, rows){
        //             if(err) res.json(err);
        //             else {
        //                 res.json(rows);
        //             }
        //         })
        //     } else if (typeSort == "AtoZ") {
        //         Product.sortProductByNameAsc(function(err, rows) {
        //             if(err) res.json(err);
        //             else {
        //                 res.json(rows);
        //             }
        //         })
        //     } else if (typeSort == "ZtoA") {
        //         Product.sortProductByNameDesc(function(err, rows) {
        //             if(err) res.json(err);
        //             else {
        //                 res.json(rows);
        //             }
        //         })
        //     } else if (typeSort == "DateOldToNew") {
        //         console.log("DateOldToNew")
        //     } 
        //     else {
        //         console.log("DateNewToOld")
        //     }
        // } else {
        //     slug = slug.split('-').join(' ');
        //     Product.getProductByCategory(slug, function(err, rows){
        //         if(err) res.json(err);
        //         else {
        //             if (typeSort == "PriceAsc") {
        //                 rows.sort((a, b) => (a.Price > b.Price) ? 1 : -1);
        //                 res.json(rows);
        //             }
        //             if (typeSort == "PriceDesc") {
        //                 rows.sort((a, b) => (a.Price < b.Price) ? 1 : -1);
        //                 res.json(rows);
        //             }
        //             if (typeSort == "AtoZ") {
        //                 rows.sort((a, b) => (a.ProductName.toLowerCase() > b.ProductName.toLowerCase()) ? 1 : -1);
        //                 res.json(rows);
        //             }
        //             if (typeSort == "ZtoA") {
        //                 rows.sort((a, b) => (a.ProductName.toLowerCase() < b.ProductName.toLowerCase()) ? 1 : -1);
        //                 res.json(rows);
        //             }
        //             if (typeSort == "DateOldToNew") {
        //                 console.log("DateOldToNew")
        //             }
        //             if (typeSort == "DateNewToOld") {
        //                 console.log("DateNewToOld")
        //             }
        //         }
        //     })
        // }
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
                var brand = [];
                var newBrand = [];
                for (let i = 0; i < product.length; i++) {
                    brand.push(product[i].Brand_name);
                    if (newBrand.indexOf(brand[i]) == -1) {
                        newBrand.push(brand[i]);
                    }
                }
                newBrand.sort();
                res.render('product', {rows: rows, cate: cate, brand: newBrand});
            }
            afterFilterCate = rows;
            afteMultiFiter = rows;
        })
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
const db = require('../../config/db/database');

var Product = {
    getAllCategory:function(callback) {
        return db.connection.query('SELECT * FROM Categories', callback);
    },
    getAllProduct:function(callback){
        return db.connection.query('SELECT * FROM Products, Brands where Products.Brand_id = Brands.Brand_id', callback);
    },
    getProductById:function(id, callback){
        return db.connection.query('select * from Products where ProductID =?', [id], callback);
    },
    getProductBySlug:function(slug, callback){
        return db.connection.query('select * from Products, Brands where Products.Brand_id = Brands.Brand_id and slug=?', [slug], callback);
    },
    sortProductByCostAsc:function(callback){
        return db.connection.query('select * from products order by Price asc', callback);
    },
    sortProductByCostDesc:function(callback){
        return db.connection.query('select * from products order by Price desc', callback);
    },
    sortProductByNameAsc:function(callback){
        return db.connection.query('select * from products order by ProductName asc', callback);
    },
    sortProductByNameDesc:function(callback){
        return db.connection.query('select * from products order by ProductName desc', callback);
    },
    checkOutStock:function(productID, value){
        db.connection.query('select * from Products where ProductID = ?',[productID], function(err, results){
            if (err) {
                console.log(err);
            } else {
                const numOfProductNow = results[0].ProductStock;
                if (value < numOfProductNow) {
                    return false;
                } else {
                    return true;
                }
            }
        });
    },
    shopbyBrandApple:function(callback){
        return db.connection.query('select * from products,brands where products.Brand_id=brands.Brand_id and brands.Brand_name like"Apple"',callback)
    },
    getProductByBrand:function(brandName, callback){
        return db.connection.query('select * from Products, Brands where Products.Brand_id = Brands.Brand_id and Brands.Brand_name=?', [brandName], callback);
    },
    getProductByCategory:function(slug, callback){
        return db.connection.query('select * from Products, Categories, Product_Category where Products.ProductID = Product_Category.ProductID and Categories.Category_id = Product_Category.Category_id and lower(Categories.Category_name) = ?', [slug], callback);
    },
};

module.exports = Product;
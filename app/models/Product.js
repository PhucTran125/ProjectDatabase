const db = require('../../config/db/database');

var Product = {
    getAllProduct:function(callback){
        return db.connection.query('SELECT * FROM Products', callback);
    },
    getProductById:function(id, callback){
        return db.connection.query('select * from Products where ProductID =?',[id], callback);
    },
    getProductBySlug:function(slug, callback){
        return db.connection.query('select * from Products where slug=?',[slug], callback);
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
    shopbyBrandApple:function(callback){
        return db.connection.query('select * from products,brands where products.Brand_id=brands.Brand_id and brands.Brand_name like"Apple"',callback)
    },
    shopbyCategoryWirelessHeadphone(callback){
        return db.connection.query('select *',callback);
    },
};

module.exports = Product;
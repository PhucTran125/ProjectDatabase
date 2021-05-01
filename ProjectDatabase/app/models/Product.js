const db = require('../../config/db/database');

var Product = {
    getAllProduct:function(callback){
        return db.connection.query('SELECT * FROM Products', callback);
    },
    getProductById:function(id, callback){
        return db.connection.query('select * from Products where ProductID =?',[id], callback);
    },
    // getProductBySlug:function(slug, callback){
    //     return db.connection.query('select * from Products where slug=?',[slug], callback);
    // }
};

module.exports = Product;
const db = require('../../config/db/database');

var Cart = {
    addProduct:function(id, callback){
        return db.connection.query('INSERT INTO Product_Cart SET', [], callback)
    },
    totalCost:function(callback){
        return db.connection.query('SELECT * FROM Products, Cart, Product_Cart WHERE Products.ProductID = Product_Cart.ProductID AND Product_Cart.CartID = Cart.CartID', callback);
    },
    removeFromCart:function(id, callback){
        return db.connection.query('DELETE FROM Product_Cart WHERE  ProductID =?', [id], callback); 
    },
    checkOutStock:function(productID, value){
        db.connection.query('select * from Products where ProductID = ?',[productID], function(err, results){
            if (err) {
                console.log(err);
            } else {
                const numOfProductNow = results[0].ProductStock;
            }
        });
        if (value < numOfProductNow) {
            return true;
        } else {
            return false;
        }
    },
    increProduct:function(cartID, productID, value, callback){
        return db.connection.query('update Product_Cart set NumProduct = ? where (CartID, ProductID) = (?, ?)',[value, cartID, productID]);
    },
};

module.exports = Cart;
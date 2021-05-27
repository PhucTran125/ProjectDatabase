const { addProduct } = require('../models/Cart');
const Cart = require('../models/Cart');

class CartController{
    // addProduct(){
    //     Cart:addProduct()
    // };
    showCart(req, res) {
        const sess = req.session.userID;
        Cart.totalCost(function(err, rows){
            if(err) res.json(err);
            else {
                var totalCost = 0;
                var subCost = [];
                for (var i = 0; i < rows.length; i++) {
                    // totalCost += rows[i].Price;
                    subCost[i] = rows[i].Price * rows[i].NumProduct;
                    totalCost += subCost[i];
                }
                res.render('cart', {rows: rows, totalCost: totalCost, subCost: subCost, sess: sess});
            }
        });
    };
    removeFromCart(req, res) {
        const sess = req.session.userID;
        var x = () => {
            Cart.removeFromCart(function(err) {
                if(err) res.json(err);
            });
        };
        res.render('cart', {x: x, sess: sess})
    };
    update(req, res) {
        const sess = req.session.userID;
        Cart.updateProduct(sess.cartid, req.body.id, req.body.quantity, function(err) {
            if(err) res.json(err);
        });
        // console.log(req.body.id);
        // console.log(req.body.quantity);
    }
    delete(req, res) {
        const sess = req.session.userID;
        Cart.removeFromCart(req.body.id, sess.cartid, function (err) {
            if(err) res.json(err);
        })
    }
};

module.exports = new CartController;
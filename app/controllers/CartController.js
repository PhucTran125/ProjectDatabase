const Function = require('../../views/function');
const Cart = require('../models/Cart');

class CartController{
    showCart(req, res) {
        const sess = req.session.userID;
        Cart.totalCost(function(err, rows){
            if(err) res.json(err);
            else {
                res.render('cart', {rows: rows, sess: sess});
            }
        });
    };
    removeFromCart(req, res) {
        // function click() {
            
        // };
        var x = () => {
            Cart.removeFromCart(function(err) {
                if(err) res.json(err);
            });
        };
        res.render('cart', {x})
    }
};

module.exports = new CartController;
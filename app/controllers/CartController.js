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
                console.log(rows)
                var totalCost = 0;
                for (var i = 0; i < rows.length; i++) {
                    totalCost += rows[i].Price;
                }
                res.render('cart', {rows: rows, sess: sess, totalCost: totalCost});
            }
        });
    };
    removeFromCart(req, res) {
        var x = () => {
            Cart.removeFromCart(function(err) {
                if(err) res.json(err);
            });
        };
        res.render('cart', {x})
    }
};

module.exports = new CartController;
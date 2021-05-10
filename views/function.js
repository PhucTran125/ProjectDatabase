
const Cart = require('../app/models/Cart');

var Function = {
    plus(value, cartID, productID) {
        if(Cart.checkOutStock(productID, value) == true) {
            Cart.increProduct(cartID, productID, value);
        }
    },
    qtyplus1(){
        const count = 1;
        // count++;
        console.log("+");
    }
};

module.exports = Function;
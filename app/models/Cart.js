const db = require('../../config/db/database');

var Cart = {
    addProduct:function(id, callback){
        return db.connection.query('insert into ')
    },
};

module.exports = Cart;
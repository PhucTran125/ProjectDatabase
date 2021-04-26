const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbproject'
});

function connect() {
   
    connection.connect(function(err) {
        if(err) {
            console.log("Error");
        } else console.log('Connected!');
    });
}
function all() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM products`, (err, results) => {
            if(err) {
                return reject(err);
            }
            else {
                console.log('Connected...');
                return resolve(results);
            }
        });
    });
}


module.exports = {connection, connect, all};


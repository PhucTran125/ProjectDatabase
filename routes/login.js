const express = require('express');
const db = require('../config/db/database');
const router = express.Router();
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', encoder, async(req, res, next) => {
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		db.connection.query('SELECT * FROM User_table WHERE Email = ? AND Password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
                res.send('home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

router.post('/register', encoder, async(req, res, next) => {
    var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var phoneNumber = req.body.phoneNumber;
	var email = req.body.email;
	var password = req.body.password;
	var city =  req.body.city;
	var country = req.body.country;
	if (firstname && lastname && phoneNumber && email && password && city && country) {
		db.connection.query('INSERT INTO User_table (FirstName, LastName, Phone, Email, Password, City, Country) value ()', [username, password], function(error, results, fields) {
			if (results.length > 0) {
                res.send('home');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});
module.exports = router;
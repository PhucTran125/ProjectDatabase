const db = require('../../config/db/database');
const bcrypt = require('bcryptjs');
const authenticate = require('../../config/auth/auth');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');

class AccountController {
    //[POST] /login
    login(req, res, next) {
        try {
            var {email, password} = req.body;
    
            if (!email || !password) {
                return res.status(400).render('login', {message: 'Please provide an email and password'});
            }
            db.connection.query('SELECT * FROM User_table WHERE Email = ?', [email], async function(error, results){
                // console.log(results);
                if (results.length == 0){
                    return res.status(400).render('login', {message: 'No user with this email'});
                }
                bcrypt.compare(password, results[0].Password, function(error, response){
                    if (error) {console.log(error)}
                    if (response == false) {
                        return res.status(400).render('login', {message: 'Password incorrect'})
                    }
                    else {
                        req.session.userID = {
                            id: results[0].UserID, 
                            email: results[0].Email, 
                            cartid: results[0].CartID
                        };
                        return res.redirect('/');
                    }
                });
            });
    
        } catch (error) {
            console.log(error);
        }
    };

    //[POST /register
    register(req, res, next) {
        var {firstName, lastName, phone, email, password, passwordConfirm, city, country} = req.body;

        db.connection.query('SELECT * FROM User_table', [email], async function(error, results, fields){
            if (error) {
                console.log(error);
            }
            for (let i = 0; i < results.length; i++) {
                if (email.localeCompare(results[i].Email) == 0)
                    return res.render('register', {message: 'That email is already use'});
            }
            if (password != passwordConfirm) {
                return res.render('register', {message: 'Password do not match'});
            }
            else {
                let hashedPassword = await bcrypt.hash(password, 8); 
                // 8: how many time you want to hash password
                console.log(hashedPassword);
                // Create cart
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
                Cart.createCart(results.length+1, dateTime, dateTime, 'Cash, Internet Banking, Paypal, ViettelPay');
                // Create user
                db.connection.query('INSERT INTO User_table SET ?', {FirstName: firstName, LastName: lastName, Phone: phone, Email: email, Password: hashedPassword, City: city, Country: country, WishListID: results.length + 1, CartID: results.length + 1}, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        req.session.userID = email;
                        return res.redirect('/');
                    }
                });
            }
        });
    };
    logout(req, res, next) {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/')
            }

            res.clearCookie(process.env.SESS_NAME);
            res.redirect('/');
        })
    };
    redirectLogin(req, res, next) {
        if (!req.session.userID) {
            res.redirect('/account/login');
        } else {
            next();
        }
    };
    redirectHome(req, res, next) {
        if (req.session.userID) {
            res.redirect('/');
        } else {
            next();
        } 
    };
}

module.exports = new AccountController;
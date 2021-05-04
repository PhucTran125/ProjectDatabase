const db = require('../../config/db/database');
const bcrypt = require('bcryptjs');

class AccountController {
    //[POST] /login
    login(req, res, next) {
        try {
            var {email, password} = req.body;
    
            if (!email || !password) {
                return res.status(400).render('login', {message: 'Please provide an email and password'});
            }
            db.connection.query('SELECT * FROM User_table WHERE Email = ?', [email], async function(error, results){
                console.log(results);
                if (results.length == 0){
                    return res.status(400).render('login', {message: 'No user with this email'});
                }
                bcrypt.compare(password, results[0].Password, function(error, response){
                    if (error) {console.log(error)}
                    if (response == false) {
                        return res.status(400).render('login', {message: 'Password incorrect'})
                    }
                    else {
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

        db.connection.query('SELECT * FROM User_table WHERE Email = ?', [email], async function(error, results, fields){
            if (error) {
                console.log(error);
            }
            
            if (results.length > 0) {
                return res.render('register', {message: 'That email is already use'});
            } else if (password != passwordConfirm) {
                return res.render('register', {message: 'Password do not match'});
            }
            else {
                let hashedPassword = await bcrypt.hash(password, 8); 
                // 8: how many time you want to hash password
                console.log(hashedPassword);

                db.connection.query('INSERT INTO User_table SET ?', {FirstName: firstName, LastName: lastName, Phone: phone, Email: email, Password: hashedPassword, City: city, Country: country}, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        return res.redirect('login');
                    }
                });
            }
        });
    };
}

module.exports = new AccountController;
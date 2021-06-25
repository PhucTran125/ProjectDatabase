const e = require('express');
const db = require('../../config/db/database');
const Cart = require('../models/Cart');

var orderItem = [];
var subTotal = 0;

class OrderController {
    createOrder(req, res, next) {
        const sess = req.session.userID;
        if (typeof sess === "undefined") {
            console.log("login")
            res.redirect('/account/login');
        }
        else {
            db.connection.query("Select * from Ordered where UserID = ? and OrderState = 'Processing'", [sess.id], function (error, done) {
                if (error) console.log(error);
                else {
                    console.log(done.length)
                    if (done.length == 0) {
                        var countOrdered = 0;
                        db.connection.query("Select * from Ordered", function (err, results) {
                            if (err) console.log(err);
                            countOrdered = results.length;
                        })
                        db.connection.query("Insert into Ordered (OrderID, OrderState, UserID) values(?, ?, ?)", ["OR#"+countOrdered+1, "Processing", sess.id], function (error) {
                            if (error) console.log(error);
                        })
                        Cart.getProductOrdered(sess.cartid, async function (err, rows) {
                            if (err) console.log(err);
                            else {
                                for (let i = 0; i < rows.length; i++) {
                                    db.connection.query('Insert into OrderItem values (?, ?, ?)', ["OR#" + countOrdered + 1, rows[i].ProductID, rows[i].NumProduct], function (error) {
                                        if (error) console.log(error);
                                        console.log(i);
                                    })
                                }
                            }
                        })
                        
                    }
                }
            })
            setTimeout(function(){
                next();
                console.log("next ok")
            }, 100)   
        }
    };
    fillInfoPage(req, res) {
        const sess = req.session.userID;
        db.connection.query('Select Products.ProductName, Products.Color, Products.Price, Products.Material, Products.thumbnail_photo, Quantity from OrderItem, Products where OrderItem.ProductID = Products.ProductID', function(error, rows) {
            if (error) console.log(error);
            else {
                if (typeof sess === "undefined") {
                    console.log("login")
                    res.redirect('/account/login');
                }
                else 
                {
                    console.log(orderItem)
                    if (orderItem.length == 0) {
                        for(let i = 0; i < rows.length; i++) {
                            orderItem.push(rows[i]);
                            subTotal += rows[i].Quantity * rows[i].Price;
                        }
                    }
                    res.render('information', {rows: rows, subTotal: subTotal});
                }
            }
        });
        
    };
    fillShippingPage(req, res) {
        const sess = req.session.userID;
        if (typeof sess === "undefined") {
            console.log("login");
            res.redirect('/account/login');
        }
        else res.render('shipping', {rows: orderItem, subTotal: subTotal})
    };
    fillPaymentPage(req, res) {
        const sess = req.session.userID;
        if (typeof sess === "undefined") {
            console.log("login");
            res.redirect('/account/login');
        }
        else res.render('payment', {rows: orderItem, subTotal: subTotal})
    };
    completeOrder(req, res) {
        const sess = req.session.userID;
        var addr = req.body.addr;
        var city = req.body.city;
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        addr = addr + ", " + city;
        db.connection.query('Update Ordered set OrderContact = ? where UserID = ?', [req.body.contact, sess.id]);
        db.connection.query('Update Ordered set OrderShippingAddr = ? where UserID = ?', [addr, sess.id]);
        db.connection.query('Update Ordered set OrderAddrDetail = ? where UserID = ?', [req.body.addrDetail, sess.id]);
        db.connection.query('Update Ordered set OrderDate = ? where UserID = ?', [dateTime, sess.id]);
        db.connection.query('Update Ordered set ShippingMethod = ? where UserID = ?', [req.body.shipMeth, sess.id]);
        db.connection.query('Update Ordered set PaymenMethod = ? where UserID = ?', [req.body.payMeth, sess.id]);
        db.connection.query('Update Ordered set TotalCost = ? where UserID = ?', [req.body.totalCost, sess.id]);
        db.connection.query('Update Ordered set OrderState = ? where UserID = ? and OrderState = ?', ["Complete", sess.id, "Processing"], function(error) {
            if (error) console.log(error);
            else console.log("ok2")
        })
    };
}

module.exports = new OrderController;
const catalogRouter = require('./catalog');
const siteRouter = require('./site');
const apiRouter = require('./db');
const logRouter = require('./account');
// const apiRouter = require('./db');

function route(app) {
    app.use('/payment',(req,res) =>{
        res.render('payment');
    });
    
    app.use('/account', logRouter);

    app.use('/api/test', apiRouter);

    app.use('/catalog', catalogRouter);

    app.use('/', siteRouter);
    
}

module.exports = route;
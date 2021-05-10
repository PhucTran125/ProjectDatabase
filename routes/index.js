const catalogRouter = require('./catalog');
const siteRouter = require('./site');
const apiRouter = require('./db');
const logRouter = require('./account');
const cartRouter = require('./cart');

function route(app) {

    app.use('/my-cart', cartRouter);

    app.use('/account', logRouter);

    app.use('/api/test', apiRouter);

    app.use('/catalog', catalogRouter);

    app.use('/', siteRouter);
    
}

module.exports = route;
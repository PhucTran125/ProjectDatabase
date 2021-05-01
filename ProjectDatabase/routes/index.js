const catalogRouter = require('./catalog');
const siteRouter = require('./site');
const apiRouter = require('./db');
// const apiRouter = require('./db');

function route(app) {
    app.use('/api/test', apiRouter);

    app.use('/catalog', catalogRouter);

    app.use('/', siteRouter);
    
}

module.exports = route;
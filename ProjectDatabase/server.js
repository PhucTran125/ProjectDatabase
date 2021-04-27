const express = require('express');
const articleRouter = require('./routes/articles');
const app = express();
const route  = require('./routes');
const router = require('./routes/articles');
const db = require('./config/db/database');

// Static files
app.use(express.static(__dirname + '/views'));
// app.use('/Stylesheets', express.static(__dirname + 'public/Stylesheets'))


// Set view
app.set('view engine', 'ejs');
// Connect to database
db.connect();
// Routes init
route(app);

// Listen to port 3000
app.listen(3000);
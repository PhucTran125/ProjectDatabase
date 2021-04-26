const express = require('express')
const articleRouter = require('./routes/articles')
const cartRouter = require('./routes/cart')
const app = express()


// Static files
app.use(express.static(__dirname + '/public'))
// app.use('/Stylesheets', express.static(__dirname + 'public/Stylesheets'))


// Set view
app.set('view engine', 'ejs')


app.use('/articles', articleRouter)
app.use('/cart', cartRouter)

app.get('/', (req, res) => {
    res.render('product')
})

// Listen to port 3000
app.listen(3000)
const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()


// Static files
app.use(express.static(__dirname + '/public'))
// app.use('/Stylesheets', express.static(__dirname + 'public/Stylesheets'))


// Set view
app.set('view engine', 'ejs')


app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    res.render('newindex')
})

// Listen to port 3000
app.listen(3000)
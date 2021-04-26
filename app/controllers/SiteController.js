class SiteController {
    //[GET] /
    home(req, res) {
        res.render('home');
    }

    //[GET] /blog
    blog(req, res) {
        res.send('blog page');
    }

    //[GET] /login-page
    login(req, res) {
        res.render('login');
    }

    //[GET] /page-info
    pages(req, res) {
        res.send('page-info')
    }
}

module.exports = new SiteController;
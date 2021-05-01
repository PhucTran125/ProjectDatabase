
class CatalogController {
    //[GET] /catalog
    index(req, res, next) {
        res.render('product');
    };
    
    //[GET] /catalog/slug
    show(req, res) {
        res.send('product detail!!!');
    }
}

module.exports = new CatalogController;
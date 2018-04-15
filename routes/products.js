
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('shop/products', {title: 'Buy Products', layout: 'productSearchLayout'});

});

module.exports = router;
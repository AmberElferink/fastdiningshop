//dit bestandje wordt alleen opgestart op het moment dat de server start

var express = require('express');
var router = express.Router();


//
router.get('/', function(req, res, next) {
    res.render('product', {title: 'Buy Products', layout: 'productDescriptionLayout'});
});


module.exports = router;

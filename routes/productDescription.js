//dit bestandje wordt alleen opgestart op het moment dat de server start

var express = require('express');
var router = express.Router();


//
router.get('/:barcode', function(req, res, next) {
    console.log(req.params.barcode); //geeft de barcode die je kan gebruiken voor inladen van je zooi
    res.render('product', {title: 'Buy Products', layout: 'productDescriptionLayout', description: 'ik ben een banaan'});
});

module.exports = router;

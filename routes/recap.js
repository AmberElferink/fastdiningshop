var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('recap', { title: 'Recap' , layout: 'layoutRecap'});
});

module.exports = router;

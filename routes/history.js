var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('history', { title: 'My Order History', layout:'layoutHistory'});
});

module.exports = router;

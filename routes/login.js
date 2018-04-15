var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login', layout: 'layoutLogin', success: false, errors: req.session.errors });
    req.session.errors = null;
});

module.exports = router;

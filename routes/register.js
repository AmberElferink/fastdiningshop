var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register', layout: 'layoutRegister', success: false, errors: req.session.errors });
    req.session.errors = null;
});

module.exports = router;
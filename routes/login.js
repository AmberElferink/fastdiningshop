var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login', layout: 'layoutLogin', success: false, errors: req.session.errors });
    req.session.errors = null;
});

/*
router.post('/submit', function(req, res, next){
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Invalid password').isLength({min: 4}).equals(req.body.confirmPassword);

    var errors = req.validationErrors();
    if (errors){
        req.session.error = errors;
        req.session.succes = false;
    } else {
        req.session.succes = true;

    }
    res.redirect('/login')
});
*/

module.exports = router;

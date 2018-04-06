var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register', layout: 'layoutRegister', success: false, errors: req.session.errors });
    req.session.errors = null;
});

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
    res.redirect('/register')
});

module.exports = router;
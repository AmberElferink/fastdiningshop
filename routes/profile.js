
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);
var express = require('express');
var router = express.Router();
var app = express();
session = require('express-session');
/*
router.get('/:username',auth, function(req, res, next) {
    console.log(req.param('username'));
    res.render('profile', {title: 'Profile Fast Dining', layout: 'layoutProfile'});

});*/
//authorises if the user may access the page
var auth = function (req, res, next) {
    if(req.query.user == undefined) //the path is /profile, without a query
    {
        return res.sendStatus(401); //login session not active/unauthorised
    }
    if(req.session && req.session.user === req.query.user)
    {
        return next();
    }
    else
    {
        return res.sendStatus(401); //login session not active/unauthorised
    }
};



router.get('/', auth, function (req, res, next) {
    console.log(req.query);

    res.render('profile', {title: 'Profile Fast Dining', welcome: 'Hello ' + req.query.user, layout: 'layoutProfile', success: false, errors: req.session.errors});
     req.session.errors = null;
});



module.exports = router;

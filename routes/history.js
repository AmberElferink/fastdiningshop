
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);
var express = require('express');
var router = express.Router();
var app = express();
session = require('express-session');

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

/* GET home page. */
router.get('/', auth, function(req, res, next) {
    res.render('history', { title: 'My Order History', layout:'layoutHistory', success: false, errors: req.session.errors});
    req.session.errors = null;
});

module.exports = router;

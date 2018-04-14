
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);
var express = require('express');
var router = express.Router();
var app = express();
session = require('express-session');



router.get('/',function(req, res, next) {
    if(req.session) {
        res.send(req.session.user);
        //req.session.errors = null;
    } else{
        res.send("No User");
    }
});


module.exports = router;
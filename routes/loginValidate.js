
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
        res.send(req.session.user + " origin: " + req.query.path2 + " "+ req.query.search2);
        //req.session.errors = null;
    } else{
        res.send("No User");
    }
});


//code from: https://medium.com/@nikjohn/express-js-node-js-extract-path-from-request-object-529ceef2c7e5
function pathExtractor(req) {
    // Escaping user input to be treated as a literal
    // string within a regular expression accomplished by
    // simple replacement
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    }
    // Replace utility function
    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }
    return replaceAll(req.get('referer'), req.get('origin'), '');
}


module.exports = router;
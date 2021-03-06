
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);
var express = require('express');
var router = express.Router();
var app = express();
session = require('express-session');



router.get('/',function(req, res, next) {
    if(req.session.user == undefined)
    {
        res.send("notLoggedIn");
    }
    else
    {
        selectIdFromDatabase(function(err, personid){
            console.log(req.session.user);
            console.log(personid);
            res.send(personid[0].personid.toString());

        },req.session.user);
    }
});


module.exports = router;


function selectIdFromDatabase(callback, username) {
    let db = new sqlite3.Database(file, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the database');

    });
    db.serialize(function () {
        db.all("SELECT personid FROM Persons WHERE username=?", [username], function (err, rows) {
            if (err) {
                return callback(err);
            }
            //de eerste moet je op undefined zetten, omdat hij anders in de aanroep de rows als error teruggeeft,
            //en dan zijn de returnValues dus undefined
            callback(undefined, rows);
        });
        //wacht tot alle queries klaar zijn en sluit de database dan af
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
}
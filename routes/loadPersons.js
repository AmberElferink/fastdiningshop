var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/database/fastdining.db";
var exists = fs.existsSync(file);

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res) {
    //dit function deel is hetgene waarmee de callback(undefined, rows) wordt aangeroepen
    //alles binnen deze functie doet hij pas nadat de callback is uitgevoerd. Als je res.send(data);
    //dus onder de }); zet, dan krijg je undefined terug omdat de callback nog niet klaar was, toen hij was uitgevoerd
    readPersonsFromDatabase(function(err, returnValues){
        var data = returnValues;
        res.send(data);
    },req.query);
});

module.exports = router;



function readPersonsFromDatabase(callback, query){
    //creates a new database
    let db = new sqlite3.Database(file, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the database');

    });
    db.serialize(function () {
        console.log(query);
        if(query.products == undefined) {
            db.all("SELECT * FROM Persons", [], function (err, rows) {
                if (err) {
                    return callback(err);
                }
                //de eerste moet je op undefined zetten, omdat hij anders in de aanroep de rows als error teruggeeft,
                //en dan zijn de returnValues dus undefined
                callback(undefined, rows);
            });
        }
        else
        {
            console.log(query.products); //query.products is wat ingetypt is, dus waar de query op moet werken
            db.all("SELECT * FROM Persons WHERE Products.name LIKE 'fet'", [], function (err, rows) {
                if (err) {
                    return callback(err);
                }
                //de eerste moet je op undefined zetten, omdat hij anders in de aanroep de rows als error teruggeeft,
                //en dan zijn de returnValues dus undefined
                callback(undefined, rows);
            });
        }

    });



    //wacht tot alle queries klaar zijn en sluit de database dan af
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });}

    //db.all("SELECT * FROM Products WHERE Products.name LIKE ? ", ['%' + query.products + '%'], function (err, rows) {
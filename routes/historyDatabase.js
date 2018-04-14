var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    //dit function deel is hetgene waarmee de callback(undefined, rows) wordt aangeroepen
    //alles binnen deze functie doet hij pas nadat de callback is uitgevoerd. Als je res.send(data);
    //dus onder de }); zet, dan krijg je undefined terug omdat de callback nog niet klaar was, toen hij was uitgevoerd
    readOrdersFromDatabase(function(err, returnValues){
        var data = returnValues;
        res.send(data);
    },req.query);
});


module.exports = router;



function readOrdersFromDatabase(callback, query){
    //creates a new database
    let db = new sqlite3.Database(file, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the database');

    });
    db.serialize(function () {
        console.log(query);
        if(query.user == undefined) {
            return console.error('Username is undefined.');

        }
        else
        {

            db.all("SELECT * FROM(SELECT * FROM(SELECT username AS orderuser, * FROM Products LEFT OUTER JOIN Orders ON Orders.productid = Products.barcode) LEFT OUTER JOIN Persons ON Persons.username = orderuser) WHERE username = ? ", [query.user], function (err, rows) {
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
    });
}
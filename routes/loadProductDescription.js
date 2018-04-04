var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);

var express = require('express');
var router = express.Router();




//Ctrl+D = regel dupliceren
//Alt+Shift+pijtjeOmhoog/pijltjeBeneden is regel omhoog en naar beneden verplaatsen

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.params.barcode); //geeft de barcode die je kan gebruiken voor inladen van je zooi
    //dit function deel is hetgene waarmee de callback(undefined, rows) wordt aangeroepen
    //alles binnen deze functie doet hij pas nadat de callback is uitgevoerd. Als je res.send(data);
    //dus onder de }); zet, dan krijg je undefined terug omdat de callback nog niet klaar was, toen hij was uitgevoerd
    readProductsFromDatabase(function(err, returnValues){
        var data = returnValues;
        res.send(data);
    },req.query);
});

module.exports = router;



function readProductsFromDatabase(callback, query){
    //creates a new database
    let db = new sqlite3.Database(file, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the database');

    });
    db.serialize(function () {
        console.log(query);
        if(query.productbarcode == undefined) {
            db.all("SELECT * FROM Products", [], function (err, rows) {
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
            console.log(query.productbarcode); //query.products is wat ingetypt is, dus waar de query op moet werken
            db.all("SELECT * FROM Products WHERE Products.barcode =" + query.productbarcode, [], function (err, rows) {
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

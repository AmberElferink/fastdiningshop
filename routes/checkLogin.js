
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);

var express = require('express');
var router = express.Router();




/* GET home page. */
router.post('/', function (req, res) {

    //dit function deel is hetgene waarmee de callback(undefined, rows) wordt aangeroepen
    //alles binnen deze functie doet hij pas nadat de callback is uitgevoerd. Als je res.send(data);
    //dus onder de }); zet, dan krijg je undefined terug omdat de callback nog niet klaar was, toen hij was uitgevoerd
    checkLoginWithDatabase(function(err, returnValues){
        var data = returnValues;
        res.send(data);
    },req.body);
});

module.exports = router;








function checkLoginWithDatabase(callback, loginData){
    console.log("checking");
    //creates a new database
    let db = new sqlite3.Database(file, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the database');

    });

    //selects correct tuple and checks if password is the same as the entered password.
    db.serialize(function () {

            db.all("SELECT * FROM Persons WHERE Persons.username = ?", [loginData.username], function (err, row) {
                console.log(row.length);
                for(var i = 0; i < row.length; i++) {

                    console.log(row);

                    if (err) {
                        return callback(err);
                    }
                    console.log(row[i].password);
                    console.log(loginData.password);
                    if (row == undefined) {
                        //username not found in database
                        callback(undefined, false);
                        return;
                    }
                    else if (row[i].password == loginData.password) {
                        callback(undefined, true);
                        return;
                    }
                    else {
                        //password not correct
                        callback(undefined, false);
                        return;
                    }
                }
                //username not found in database row.length = 0
                callback(undefined, false);
                return;
            });
    });
    //wacht tot alle queries klaar zijn en sluit de database dan af
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}






//db.get als je een tupel wil krijgen
//geeft het terug in een javascript object
//row.name geeft naam
//db.all als je alle tupels wil in een array. Elk object is een element uit een array
/*
Als je dingen zou willen toevoegen aan de database:
// Start preparing the statement
  var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

//Insert random data
  var rnd;
  for (var i = 0; i < 10; i++) {
    rnd = Math.floor(Math.random() * 10000000);
    stmt.run("Thing #" + rnd); // running the statement
  }
// Finishing the statement. Not necessary, but improves performance
  stmt.finalize();

 */






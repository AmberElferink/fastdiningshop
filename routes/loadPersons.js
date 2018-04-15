var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/database/fastdining.db";
var exists = fs.existsSync(file);

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res) {
    //this function is were the callback(undefined, rows) is called
    //everything inside this function is done after the callback is done, if you put res.send(data);
    //under the });, it gives you back undefined because is was not done, when called upon
    readPersonsFromDatabase(function(err, returnValues){
        var data = returnValues;
        res.send(data);
    },req.query);
});

module.exports = router;

//this function read all of the persons from the database
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
                //the first needs to be undefined, because otherwise he will give the rows as error and
                //this wil results in undefined returnValues
                callback(undefined, rows);
            });
        }

        else
        {
            console.log(query.products); //query.products is what is typed in, so where the query need to work on
            db.all("SELECT * FROM Persons WHERE Products.name LIKE 'fet'", [], function (err, rows) {
                if (err) {
                    return callback(err);
                }
                //the first needs to be undefined, because otherwise he will give the rows as error and
                //this wil results in undefined returnValues
                callback(undefined, rows);
            });
        }

    });



    //wait untill all queries are done and then exit the database
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });}


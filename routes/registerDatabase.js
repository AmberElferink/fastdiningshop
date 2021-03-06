
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);
var express = require('express');
var router = express.Router();



router.post('/', function (req, res) {
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Invalid password').isLength({min: 4}).equals(req.body.confirmPassword);

addRegistryToDatabase(function(err, returnValues){
    var data = returnValues;
    res.send(data);
    var errors = req.validationErrors();
    if (errors){
        req.session.error = errors;
        req.session.succes = false;
    } else {
        req.session.succes = true;

    }
},req.body);
});

module.exports = router;


function addRegistryToDatabase(callback, registerData) {
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

        // insert one row into the langs table
        db.run(`INSERT INTO Persons(firstname, surname, username, password, emailaddress) VALUES(?, ?, ?, ?, ?)`, [registerData.firstname, registerData.surname, registerData.username, registerData.password, registerData.emailaddress], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            console.log(registerData);
            return console.log("Registration succesful!");
        });
    });

    db.each("SELECT * FROM Persons where username=?",[registerData.username], function (err, row) {
        console.log(row);
            if (err) {
                return callback(err);
            }
            if (row == undefined) {
                //username not found in database
                callback(undefined, false);
                return;
            }
            else if (row.password == registerData.password) {
                callback(undefined, true);
                return;
            }
            else {
                //password not correct
                callback(undefined, false);
                return;
            }
        //username not found in database row.length = 0
        callback(undefined, false);
        return;
    });

    //wacht tot alle queries klaar zijn en sluit de database dan af
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}
module.exports = router;
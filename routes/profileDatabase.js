
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);
var express = require('express');
var router = express.Router();



router.post('/', function (req, res) {
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Invalid password').isLength({min: 4}).equals(req.body.confirmPassword);

    addNewProfileToDatabase(function(err, returnValues){
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

router.get('/', function (req, res) {
    console.log(req.query.username);
    console.log(req.session.user);
    if(req.query.username == req.session.user)
    {
     // console.log(req.query);
        selectProfileFromDatabase(function(err, returnValues){
            res.send(returnValues);
        }, req.query.username);
    }
    else
    {
        res.send("not logged in as the requested user");
    }
});

module.exports = router;

//in callback wordt de hele function(err, returnValues) etc van hierboven doorgegeven
//die functie zit dus in de variabele "callback". req.query.username zit dus in profileUser
function selectProfileFromDatabase(callback, profileUser) {
    let db = new sqlite3.Database(file, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the database');

    });
    db.serialize(function () {
       // console.log(profileUser);
        db.all("SELECT firstname, surname, username, emailaddress FROM Persons WHERE username=?", [profileUser], function (err, rows) {
            console.log(rows);
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



function addNewProfileToDatabase(callback, newProfileData) {
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
        console.log(newProfileData)
        // insert one row into the langs table
        db.run("UPDATE Persons SET firstname=?, surname=?, username=?, password=?, emailaddress=? WHERE username=?", [newProfileData.firstname, newProfileData.surname, newProfileData.username, newProfileData.password, newProfileData.emailaddress, newProfileData.oldUserName], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            console.log(newProfileData);
        });
    });

    db.all("SELECT * FROM Persons WHERE username =?",[newProfileData.username], function (err, row) {
        console.log(row);
            if (err) {
                return callback(err);
            }
            if (row == undefined) {
                //new username not found in database
                callback(undefined, false);
                return;
            }
            else if (row.password == newProfileData.password) {
                callback(undefined, true);
                return;
            }
            else {
                //something else went wrong
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
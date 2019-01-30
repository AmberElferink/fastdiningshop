
var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);
var express = require('express');
var router = express.Router();
var app = express();
session = require('express-session');



/*If a get or post loads a page, for instance /myprofile, it wil look if the person is authorised to see it using this.
 */

/* GET home page. */
router.post('/login', function (req, res) {

    //this function is were the callback(undefined, rows) is called
    //everything inside this function is done after the callback is done, if you put res.send(data);
    //under the });, it gives you back undefined because is was not done, when called upon
    checkLoginWithDatabase(function(err, returnValues, username){
        //login is correct
        if(returnValues == true)
        {
            req.session.user = username;
            res.send(
                {"boolLoginCorrect": returnValues, "currentuser": username}
            );
        }
        //login is not correct
        else
        {
            res.send(returnValues);
        }


    },req.body);
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
});

module.exports = router;

//this function checkes the the input username and password to the usernames and passwords in the database
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
                for(var i = 0; i < row.length; i++) {
                    if (err) {
                        //calls the function in the brackets at line 29
                        return callback(err);
                    }
                    if (row == undefined) {
                        //calls the function in the brackets at line 29
                        //with errors = undefined and returnValues = false
                        //username not found in database
                        callback(undefined, false);
                        return;
                    }
                    else if (row[i].password == loginData.password) {
                        //with errors = undefined and returnValues = true and username = loginData.username
                        callback(undefined, true, loginData.username);
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
    //waits untill all queries are done and than exits the database
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}







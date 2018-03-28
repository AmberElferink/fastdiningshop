var sqlite3 = require('sqlite3').verbose();

//creates a new database
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database');
    });

//wacht tot alle queries klaar zijn en sluit de database dan af
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});
var sqlite3 = require('sqlite3').verbose();

//creates a new database
let db = new sqlite3.Database('fastdining.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database');
    });


db.all("SELECT * FROM Persons", [], function(err, rows){
    if(err)
    {
        return console.error(err.message);
    }
    console.log(rows);
});


//db.get als je een tupel wil krijgen
//geeft het terug in een javascript object
//row.name geeft naam
//db.all als je alle tupels wil in een array. Elk object is een element uit een array


//wacht tot alle queries klaar zijn en sluit de database dan af
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});


var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = "fastdining.db";
var exists = fs.existsSync(file);

//creates a new database
let db = new sqlite3.Database(file, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database');
});


db.each("SELECT * FROM Products", [], function(err, row){
    if(err)
    {
        return console.error(err.message);
    }
       console.log(row.name, row.price, row.quantity, row.unit, )
});



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



//wacht tot alle queries klaar zijn en sluit de database dan af
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});


/* /products de GET knop geeft nu John Doe
/api/products bevat de John Doe

req.query bevat alles na het vraagteken, dus console.log(req.query) met http://localhost:8016/api/products?abc=123
geeft: { abc: '123' }
datzelfde voor: http://localhost:8016/api/products?product=myproduct
geeft: { product: 'myproduct' }
datzelfde voor: http://localhost:8016/api/products?product=myproduct&abc=123
geeft: { product: 'myproduct', abc: '123' }

req.body werkt alleen voor POST. Daar zit namelijk data in die ingevoerd is bij verzenden vanaf de client.
In dit geval is hello: 'myproducts' ingevoerd in products.hbs. Hij zal dan ook bij console.log(req.body) geven:
{ hello: 'myproducts' }


router.all geeft combinatie van get en post, voor als je alles wil afvangen
router.get geeft get
router.post geeft post

in products.hbs type: 'GET' neerzetten geeft het door aan router.get
in products.hbs type: 'POST' neerzetten geeft het door aan router.post

als je naar localhost:8016/products gaat, voert hij het script op products uit en krijg je
{ product: 'myproducts', abc: '123', hello: 'myproducts' }
hello: myproducts is de data die is gegaan vanuit het invoeren van de url

de /products in de router, wordt neergezet na de /api die al was gegeven door apps.js
eventueel kun je nog een verwijzing naar een ander javascript bestand doen door:
router.use('/extratoevoeginginurl', routerBestand); zoals in app.js neer te zetten

__dirname is de map waar het huidige javascript bestand in zit, in dit voorbeeld zit loadProducts.js in routes.

*/

var sqlite3 = require('sqlite3').verbose();
var fs = require("fs");
var file = __dirname + "/../ConnectionJs/fastdining.db";
var exists = fs.existsSync(file);

var express = require('express');
var router = express.Router();







/* GET home page. */
router.get('/products', function (req, res) {
    console.log(req.query);
    var data = {
        barcode: 3468999090,
        name: "Pepper",
        price: 3.00,
        volume: 300 + "g",
        manufacturer: "APPIEHIJNNN",
        description: "Ik ben stiekem een banaan"
    };
    res.send(data);
});

router.post('/products', function (req, res) {
    console.log(req.query);
    console.log(req.body);

    var data = {
        contactId: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@domain.com',
        phone: '9876454'
    };
    res.send(data);
});

module.exports = router;


console.log(file);
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


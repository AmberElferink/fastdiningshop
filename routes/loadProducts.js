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




//Ctrl+D = regel dupliceren
//Alt+Shift+pijtjeOmhoog/pijltjeBeneden is regel omhoog en naar beneden verplaatsen

/* GET home page. */
router.get('/', function (req, res) {
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
        console.log(query.products); //query.products is wat ingetypt is, dus waar de query op moet werken
        console.log(query.category);

        //this is not the best solution. But inserting the query.orderby with a ? as the rest strangely did not sort the products at all. I really tried.
        if(query.orderby === "name")
        {
            var orderby = " ORDER BY name ASC";
        }
        else if(query.orderby === "price")
        {
            orderby = " ORDER BY price ASC";
        }


        if(query.category === "all") {
            if (query.products === "all") {
                console.log("neither selected");
                db.all("SELECT * FROM Products" + orderby, [], function (err, rows) {
                    console.log(rows);
                    if (err) {
                        return callback(err);
                    }
                    //de eerste moet je op undefined zetten, omdat hij anders in de aanroep de rows als error teruggeeft,
                    //en dan zijn de returnValues dus undefined
                    callback(undefined, rows);
                });
            }
            else if (query.products !== "all"){
                console.log("only products selected");
                db.all("SELECT * FROM Products WHERE name LIKE ?" + orderby, ['%' + query.products + '%'], function (err, rows) {
                    console.log(rows);
                    if (err) {
                        return callback(err);
                    }
                    //de eerste moet je op undefined zetten, omdat hij anders in de aanroep de rows als error teruggeeft,
                    //en dan zijn de returnValues dus undefined
                    callback(undefined, rows);
                });
            }
        }
        else if(query.category !== "all"){
            if(query.products === "all")
            {
                console.log("only category selected");
                db.all("SELECT barcode, name, price, quantity, unit, manufacturer, description, image FROM (SELECT * FROM Products LEFT OUTER JOIN Categories ON Categories.productid = Products.barcode) WHERE category=?" + orderby, [query.category], function (err, rows) {
                    console.log(rows);
                    if (err) {
                        return callback(err);
                    }
                    //de eerste moet je op undefined zetten, omdat hij anders in de aanroep de rows als error teruggeeft,
                    //en dan zijn de returnValues dus undefined
                    callback(undefined, rows);
                });
            }
            else if(query.products !== "all") {
                console.log("both selected");
                db.all("SELECT barcode, name, price, quantity, unit, manufacturer, description, image FROM (SELECT * FROM Products LEFT OUTER JOIN Categories ON Categories.productid = Products.barcode) WHERE category=? AND name LIKE ?" + orderby, [query.category, '%' + query.products + '%'], function (err, rows) {
                    console.log(rows);
                    if (err) {
                        return callback(err);
                    }
                    //de eerste moet je op undefined zetten, omdat hij anders in de aanroep de rows als error teruggeeft,
                    //en dan zijn de returnValues dus undefined
                    callback(undefined, rows);
                });
            }

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






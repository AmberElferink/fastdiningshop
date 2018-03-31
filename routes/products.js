var express = require('express');
var router = express.Router();






/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('shop/products', {title: 'Buy Products',
    product: product1});

});

var ProductBox = class {
    constructor(barcode, name, price, volume, manufacturer, description){
        this.draw = function () {
            var box = document.createElement("article");

            var title = document.createElement("h1");
            title.setAttribute("class", "productName");
            var textnode = document.createTextNode(name);
            title.appendChild(textnode);
            box.appendChild(title);

            var manuf = document.createElement("p");
            manuf.setAttribute("class", "productManuf");
            textnode = document.createTextNode("Manufacturer: " + manufacturer);
            manuf.appendChild(textnode);
            box.appendChild(manuf);

            var button = document.createElement('button');
            button.setAttribute("class", "addToCart");
            button.appendChild(document.createTextNode("Add to cart"));
            box.appendChild(button);

            $(".row")[0].appendChild(box);
        };
    };
};


product1 = new ProductBox(
    3468999090, "Pepper", 3.00, 300 + "g", "APPIEHIJNNN", "Ik ben stiekem een banaan"
);
product1.draw();

console.log("ikdoeweldingenhoor");

module.exports = router;
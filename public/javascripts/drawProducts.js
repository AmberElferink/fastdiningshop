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
    3468999090, "name", 3.00, 300 + "g", "APPIEHIJNNN", "Ik ben stiekem een banaan"
);
product1.draw();


getProducts(function (returnValues) {
    console.log(returnValues);
});

function getProducts(callback) {
    $.ajax({
        type: 'GET',
        url: '/api/products',
        dataType: 'json',
    })//als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
    //als het goed is gegaan, callt hij de .done hieronder.
        .done(function (data) {
            //deze done functie logt het naar de javascript console en print het op de pagina als txt
            //console.log('GET response:', JSON.stringify(data, "", 2));
            callback(data);
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}


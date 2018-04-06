//roept de callback functie getProducts aan, die met een GET de producten uit de database inlaadt en tekent.
//laadt alle producten als je voor het eerst op de pagina komt
searchProducts(function (returnValues) {
drawProducts(returnValues);
});


//terwijl je typt updaten de producten om te voldoen aan wat je zoekt
$("#productSearch").keyup(function (e) {
    console.log(this.value);
    $("#productBox").empty(); //verwijdert alle producten voor het zoeken

    searchProducts(function (returnValues) {
        drawProducts(returnValues);
    }, "?products=" + this.value);
});


//tekent de productboxen
function drawProducts(returnValues) {
    for(let i = 0; i<returnValues.length; i++)
    {
        product = new ProductBox(
            returnValues[i].barcode, returnValues[i].name, returnValues[i].price, returnValues[i].quantity, returnValues[i].unit, returnValues[i].manufacturer, returnValues[i].description, returnValues[i].image
        );
        product.draw();
    }
}

//classe die wordt gebruikt om productboxen aan te maken
var ProductBox = class {
    constructor(barcode, name, price, quantity, unit, manufacturer, description, image){
        this.draw = function () {
            var box = document.createElement("article");
            box.setAttribute("class", "productBox");

            var title = document.createElement("h1");
            title.setAttribute("class", "productName");
            var textnode = document.createTextNode(name);
            title.appendChild(textnode);
            box.appendChild(title);

            var imageEl = document.createElement("img");
            imageEl.setAttribute("class", "productImage");
            imageEl.setAttribute("src", "/images/products/" + image +".jpg")
            box.appendChild(imageEl);

            var priceEl = document.createElement("p");
            priceEl.setAttribute("class", "price");
            textnode = document.createTextNode("€ "+ price);
            priceEl.appendChild(textnode);
            box.appendChild(priceEl);

            var volumeEl = document.createElement("p");
            volumeEl.setAttribute("class", "volume");
            if(unit != null)
            {
                textnode = document.createTextNode(quantity + " " + unit);
            }
            else
            {
                textnode = document.createTextNode(quantity);
            }
            volumeEl.appendChild(textnode);
            box.appendChild(volumeEl);


            var manuf = document.createElement("p");
            manuf.setAttribute("class", "productManuf");
            textnode = document.createTextNode("Manufacturer: " + manufacturer);
            manuf.appendChild(textnode);
            box.appendChild(manuf);

            var descriptionEl = document.createElement("p");
            descriptionEl.setAttribute("class", "description");
            textnode = document.createTextNode(description);
            descriptionEl.appendChild(textnode);
            box.appendChild(descriptionEl);

            var button = document.createElement('button');
            button.setAttribute("class", "buyProduct");
            button.appendChild(document.createTextNode("Buy Product"));
            box.appendChild(button);

            $(".row")[0].appendChild(box);
        };
    };
};


//zoekt producten in de database
function searchProducts(callback, search) {
    if(!search)
    {
        search = "";
    }
    $.ajax({
        type: 'GET',
        url: '/api/products'+search,
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

/*<script>
    function get(product) {
        $.ajax({
            type: 'POST',
            url: '/api/products?product='+product+'&abc=123',
            dataType: 'json',
            data: {"hello":product}
        })//als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
        //als het goed is gegaan, callt hij de .done hieronder.
                .done(function (data) {
                    console.log(data);
                    //deze done functie logt het naar de javascript console en print het op de pagina als txt
                    console.log('GET response:', JSON.stringify(data, "", 2));
                    $('#getResponse').html(JSON.stringify(data, "", 2));
                })
                //als het niet goed is gegaan, doet hij de fail hieronder
                .fail(function (jqXHR, textStatus, err) {
                    console.log('AJAX error response:', textStatus);
                });
    }
</script>*/

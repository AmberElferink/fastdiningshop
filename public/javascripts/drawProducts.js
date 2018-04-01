//roept de callback functie getProducts aan, die met een GET de producten uit de database inlaadt en tekent.
getProducts(function (returnValues) {
    for(let i = 0; i<returnValues.length; i++)
    {
        product = new ProductBox(
            returnValues[i].barcode, returnValues[i].name, returnValues[i].price, returnValues[i].quantity + " " + returnValues[i].unit, returnValues[i].manufacturer, returnValues[i].description
        );
        product.draw();
    }
});


//search string

$("#productSearch").keyup(function (e) {
 console.log(this.value);
 $("#productBox").empty(); //verwijdert alle producten
    
    searchProducts(function (returnValues) {
        for(let i = 0; i<returnValues.length; i++)
        {
            product = new ProductBox(
                returnValues[i].barcode, returnValues[i].name, returnValues[i].price, returnValues[i].quantity + " " + returnValues[i].unit, returnValues[i].manufacturer, returnValues[i].description
            );
            product.draw();
        }
    }, "?products=" + this.value);
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

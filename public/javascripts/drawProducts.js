//This js file will load all the product on the page when you first enter it. It calls the callback function getProducts
//thid function will use a GET to get the products out of the database. With this information, this file will load and draw the products.
var currentUser;
getProducts();

function getProducts(){
    var products = document.getElementById("productSearch").value;
    $("#productBox").empty(); //will delete all product for the search
    if(products == "")
    {
        products = "all";
    }
    searchProducts(function (returnValues) {
        drawProducts(returnValues);
    }, "?products=" + products + "&category=" + $('.category:checked').attr("id") + "&orderby=" + $('.orderby:checked').attr("id"));
    console.log(document.getElementById("productSearch").value);
    console.log($('.category:checked').attr("id"));

}

//while you type it will update the products to match what you seek
$("#productSearch").keyup(function (e) {
    getProducts();
});


$('.category').click(function (e) {
    getProducts();
});

$('.orderby').click(function (e) {
    getProducts();
});


//draws the productboxes
function drawProducts(returnValues) {
    for(let i = 0; i<returnValues.length; i++)
    {
        product = new ProductBox(
            returnValues[i].barcode, returnValues[i].name, returnValues[i].price, returnValues[i].quantity, returnValues[i].unit, returnValues[i].manufacturer, returnValues[i].description, returnValues[i].image
        );
        product.draw();
    }
}

//class that is used to make the product boxes
var ProductBox = class {
    constructor(barcode, name, price, quantity, unit, manufacturer, description, image){
        this.draw = function () {

            //creates a new article section on the webpage
            var box = document.createElement("article");
            box.setAttribute("class", "productBox");

            //will show the title of the product
            var title = document.createElement("h1");
            title.setAttribute("class", "productName");
            var textnode = document.createTextNode(name);
            title.appendChild(textnode);
            box.appendChild(title);

            //will show the image of the product
            var imageEl = document.createElement("img");
            imageEl.setAttribute("class", "productImage");
            if(image != null)
            {
                imageEl.setAttribute("src", "images/products/" + image +".jpg");
                imageEl.setAttribute("alt", name);
            }
            else
            {
                imageEl.setAttribute("src", "/images/products/noimage.png");
                imageEl.setAttribute("alt", "No Image Available");
            }
            box.appendChild(imageEl);

            //will show the price of the product
            var priceEl = document.createElement("p");
            priceEl.setAttribute("class", "price");
            textnode = document.createTextNode("€ "+ price);
            priceEl.appendChild(textnode);
            box.appendChild(priceEl);

            //will show the volume of the product
            var volumeEl = document.createElement("p");
            volumeEl.setAttribute("class", "volume");
            if(unit != null)
            {
                textnode = document.createTextNode(quantity + " " + unit);
            }
            else
            {
                textnode = document.createTextNode("amount: " + quantity);
            }
            volumeEl.appendChild(textnode);
            box.appendChild(volumeEl);

            //will show the manufacturer of the product
            var manuf = document.createElement("p");
            manuf.setAttribute("class", "productManuf");
            textnode = document.createTextNode("Manufacturer: " + manufacturer);
            manuf.appendChild(textnode);
            box.appendChild(manuf);

            // will show the description of the product
            var descriptionEl = document.createElement("p");
            descriptionEl.setAttribute("class", "description");
            textnode = document.createTextNode(description);
            descriptionEl.appendChild(textnode);
            box.appendChild(descriptionEl);

            //will show the buy button of the product
            var button = document.createElement('button');
            button.setAttribute("id", barcode);
            button.addEventListener("click", function(e){
                buyProduct(e.target.id);
            });
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
        url: './api/products'+search,
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

function findLoggedInUser(callback) {
    $.ajax({
        type: 'GET',
        url: './loginPersonid',
        dataType: 'text',
    })//gets the current logged in username
    //if there is currently no logged in user, the page will referred to login. If there is a user, the page will go to the /history page belonging to that user
        .done(function (data) {
            if (data == false) {
                currentUser = "notLoggedIn";
            }
            else {
                currentUser = data;
            }
            console.log("currentUser", currentUser);
            callback();
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}


function buyProduct(barcode) {
    findLoggedInUser(function () {
        //this inside is done after findLoggedInUser is completed
        //var barcode = $('this').attr('id');
        var confirmation = confirm("Are you sure you want to purchase this product?");
        console.log( {
            "productid": barcode,
            "user": currentUser

        });
        if(currentUser != "notLoggedIn")
        {
            if (confirmation) {
                $.ajax({
                    type: 'POST',
                    url: './api/placeOrder',
                    dataType: 'json',
                    data: {
                        "productid": barcode,
                        "user": currentUser

                    }
                })
                //als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
                //als het goed is gegaan, callt hij de .done hieronder.
                    .done(function (data) {
                        console.log(data);

                    })
                    //als het niet goed is gegaan, doet hij de fail hieronder
                    .fail(function (jqXHR, textStatus, err) {
                        console.log('AJAX error response:', textStatus);
                    });


                txt = "You pressed OK!";
            } else {
                txt = "You pressed Cancel!";
            }
            console.log(txt);
        }
        else
        {
            alert("Please log in to purchase a product.");
            window.location.assign("./login");
        }

    });
   
}


/*
<script>
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

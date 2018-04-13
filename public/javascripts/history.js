


OrderHistory(function(returnValues){
    drawOrders(returnValues);
}, window.location.search);

//tekent de productboxen
function drawOrders(returnValues) {
    console.log("Helpppp");
    
    for(let i = 0; i<returnValues.length; i++)
    {
        console.log("Helpppp");

        order = new OrderBox(
            returnValues[i].name, returnValues[i].image, returnValues[i].orderid
        );
        order.draw();
    }
}

var OrderBox = class{
    constructor(name, image, orderid){



        this.draw = function () {

            console.log("Hallooo wereld ");


            var box = document.createElement("article");
            box.setAttribute("class", "orderBox");


            var title = document.createElement("h1");
            title.setAttribute("class", "productName");
            var textnode = document.createTextNode(name);
            title.appendChild(textnode);
            box.appendChild(title);

            var id = document.createElement("h2");
            id.setAttribute("class", "orderid");
            textnode = document.createTextNode(orderid);
            id.appendChild(textnode);
            box.appendChild(id);


            var imageEl = document.createElement("img");
            imageEl.setAttribute("class", "productImage");
            if(image != null)
            {
                imageEl.setAttribute("src", "images/products/" + image +".jpg");
                imageEl.setAttribute("alt", name);
            }
            else
            {
                imageEl.setAttribute("src", "images/products/noimage.png");
                imageEl.setAttribute("alt", "No Image Available");
            }
            box.appendChild(imageEl);

            $(".row")[0].appendChild(box);
    }

}}

function OrderHistory(callback, user) {
    console.log("user");
    console.log(user);

    $.ajax({
        type: 'GET',
        url: './api/history' + user,
        dataType: 'json',
    })//als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
    //als het goed is gegaan, callt hij de .done hieronder.
        .done(function (data) {
            console.log("Done");
            //deze done functie logt het naar de javascript console en print het op de pagina als txt
            //console.log('GET response:', JSON.stringify(data, "", 2));
            callback(data);
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}
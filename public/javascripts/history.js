//this file will show the order history of the logedin user.
//it will show the orderid, the title of title of the products and the image of the product.


var personid;

findLoggedInUser(function () {
    OrderHistory(function(returnValues){
        drawOrders(returnValues);
    }, personid);

});


function findLoggedInUser(callback) {
    $.ajax({
        type: 'GET',
        url: './loginPersonid',
        dataType: 'text',
    })//gets the current logged in username
    //if there is currently no logged in user, the page will referred to login. If there is a user, the page will go to the /history page belonging to that user
        .done(function (data) {
            if (data == false) {
                personid = "notLoggedIn";
            }
            else {
                personid = data;
            }
            console.log("personid", personid);
            callback();
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}


//this function will call the drawOrders function
function drawOrders(returnValues) {


    for(let i = 0; i<returnValues.length; i++)
    {


        order = new OrderBox(
            returnValues[i].name, returnValues[i].image, returnValues[i].orderid
        );
        order.draw();
    }
}

//this class is used to make the order boxes
var OrderBox = class{
    constructor(name, image, orderid){

        this.draw = function () {

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

            document.getElementById("orderlist").appendChild(box);

    }

}}

//this function will get the information needed out of the database
function OrderHistory(callback, user) {
    console.log("user");
    console.log(user);

    $.ajax({
        type: 'GET',
        url: './api/history?user=' + user,
        dataType: 'json',
    })//als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
    //als het goed is gegaan, callt hij de .done hieronder.
        .done(function (data) {
            console.log(data);
            //deze done functie logt het naar de javascript console en print het op de pagina als txt
            //console.log('GET response:', JSON.stringify(data, "", 2));
            callback(data);
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}
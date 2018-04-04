/* function searchProducts(callback, search) {
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

*/

function validate()
{
    var un = document.login.username.value;
    var pw = document.login.password.value;
    var valid = false;
    var usernameArray = ["bob","patricia"];
    var passwordArray = ["hallo","123"];
    for (var i = 0; i < usernameArray.length; i++)
    {
        if ((un == usernameArray[i]) && (pw == passwordArray[i])){
            valid = true;
            break;
        }
    }

    if (valid)
    {
        alert("Login was succesfull");
    }
}
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




function validate() {
    var un = $('#username').val();
    var pw = $('#password').val();
    var valid = false;

    postLogin(function (returnValue) {
        console.log(returnValue);
        //giveAlert(returnValue);
    }, un, pw);

    /*var usernameArray = ["Vlad", "bob"];
    var passwordArray = ["12345", "hallo"];
    for (var i = 0; i < usernameArray.length; i++) {
        if ((un == usernameArray[i]) && (pw == passwordArray[i])) {
            valid = true;
            break;
        }
    }*/

}

function postLogin(callback, un, pw) {
    console.log(un,pw)
    $.ajax({
        type: 'POST',
        url: '/api/checkLogin',
        dataType: 'json',
        data: {
            "username": un,
            "password": pw}
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

function giveAlert(returnValue) {
    if (returnValue == true) {
        alert("Login was successful");
    }
}
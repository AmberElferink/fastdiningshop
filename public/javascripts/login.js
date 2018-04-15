
//this file will use the form in login.hbs and will check the information the user put in to the data in the database.
//if the user is already in the database he will be loged in

//gets the input of the form
function validate() {
    var un = $('#username').val();
    var pw = $('#password').val();

    //calls the postLogin function with the variables
    postLogin(function (returnValue) {
        giveAlert(returnValue);
    }, un, pw);


}


//this functions sends the input to the database
function postLogin(callback, un, pw) {
    $.ajax({
        type: 'POST',
        url: './api/checkLogin/login',
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

//this function gives an alert according to the input
function giveAlert(returnValue) {
    //if the username and password are correct
    if (returnValue.boolLoginCorrect == true) {
        //since username must be unique for the database, it can be used for the url
        window.location.replace("./history?user=" + returnValue.currentuser);
    }
    //if the username and password are incorrect
    else
    {
        alert("Username or password is incorrect");
    }
}

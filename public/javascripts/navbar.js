console.log("navbar javascript loaded");
$('#logout').click(function () {
    $.ajax({
        type: 'GET',
        url: './api/checkLogin/logout',
        dataType: 'text',
    })//als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
    //als het goed is gegaan, callt hij de .done hieronder.
        .done(function (data) {
            //deze done functie logt het naar de javascript console en print het op de pagina als txt
            //console.log('GET response:', JSON.stringify(data, "", 2));
            window.location.replace("./");
            alert(data); //gives "logout was succesful" if user was logged in, otherwise nothing.
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
});

console.log("navbar javascript loaded");
$('#historybutton').click(function () {
    $.ajax({
        type: 'GET',
        url: './loginValidate',
        dataType: 'text',
    })//als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
    //als het goed is gegaan, callt hij de .done hieronder.
        .done(function (data) {

            console.log(data);

            //deze done functie logt het naar de javascript console en print het op de pagina als txt
            //console.log('GET response:', JSON.stringify(data, "", 2));
            //window.location.replace("./");
            alert(data); //gives "logout was succesful" if user was logged in, otherwise nothing.
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
});


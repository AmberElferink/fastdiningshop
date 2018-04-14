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
    let path = window.location.pathname;
    let path2 = '?path2='+path.substr(1);
    let search = window.location.search;
    if(search)
    {
        search = '&search2=' + window.location.search;
    }
    else
    {
        search = "";
    }
    $.ajax({
        type: 'GET',
        url: './loginValidate' + path2 + search,
        dataType: 'text',
    })//als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
    //als het goed is gegaan, callt hij de .done hieronder.
        .done(function (data) {
            window.location.assign('./loginValidate' + path2 + search);
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
});


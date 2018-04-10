
    function register() {
        $.ajax({
            type: 'POST',
            url: '/api/register',
            dataType: 'json',
            data: {
                "firstname": $('#firstname').val(),
                "surname": $('#surname').val(),
                "emailaddress": $('#email').val(),
                "username": $('#username').val(),
                "password": $('#password').val()
            }
        })
        //als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
        //als het goed is gegaan, callt hij de .done hieronder.
                .done(function (data) {
                    console.log(data);
                    //logs if username already existed (false is good)
                    console.log('GET response:', JSON.stringify(data, "", 2));
                    $('#getResponse').html(JSON.stringify(data, "", 2));
                    alert("register succesful");
                })
                //als het niet goed is gegaan, doet hij de fail hieronder
                .fail(function (jqXHR, textStatus, err) {
                    console.log('AJAX error response:', textStatus);
                });
    }

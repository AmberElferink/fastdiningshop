
    function get(product) {
        $.ajax({
            type: 'POST',
            url: '/api/addusername=',
            dataType: 'json',
            data: {
                "firstname": $('#firstname').value,
                "surname": $('#surname').value,
                "emailaddress": $('#email').value,
                "username": $('#username').value,
                "password": $('#password').value
            }
        })

        console.log("doet dit het?")

        //als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
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

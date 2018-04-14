
    function register() {
        $.ajax({
            type: 'POST',
            url: './api/register',
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
                    if(data == true)
                    {
                        alert("register succesful, please log in to continue");
                        window.location.replace("./login");
                    }
                    if(data == false)
                    {
                        alert("something went wrong, please try another username");
                    }

                })
                //als het niet goed is gegaan, doet hij de fail hieronder
                .fail(function (jqXHR, textStatus, err) {
                    console.log('AJAX error response:', textStatus);
                });
    }

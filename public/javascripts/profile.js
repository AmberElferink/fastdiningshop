function editProfile(){
    $.ajax({
        type: 'POST',
        url: './api/profile',
        dataType: 'json',
        data: {
            "firstname": $('#editfirstname').val(),
            "surname": $('#editsurname').val(),
            "emailaddress": $('#editemail').val(),
            "username": $('#editusername').val(),
            "password": $('#editpassword').val()
        }
    })
    //als deze asynchronous ajax call klaar is, is het of gefaald, of goed gegaan.
    //als het goed is gegaan, callt hij de .done hieronder.
        .done(function (data) {
            console.log(data);
            alert("edit was succesful, please log in to continue");
            window.location.replace("./login");
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}
var oldUserName = "notLoggedIn";
findLoggedInUser();

findLoggedInUser(
    selectDatabaseProfile(
        function(returnValues) {
            let firstname = document.createTextNode(returnValues.firstname);
            $('#firstname').appendChild(firstname);
        }
));



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



function findLoggedInUser(callback) {
    $.ajax({
        type: 'GET',
        url: './loginValidate',
        dataType: 'text',
    })//gets the current logged in username
    //if there is currently no logged in user, the page will referred to login. If there is a user, the page will go to the /history page belonging to that user
        .done(function (data) {
                if (data == false) {
                    oldUserName = "notLoggedIn";
                }
                else {
                    oldUserName = data;
                }
                console.log("oldusername", oldUserName);
                callback();
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}

function selectDatabaseProfile(callback) {
    $.ajax({
        type: 'GET',
        url: './api/profile?username=' +oldUserName,
        dataType: 'json',
    })//gets the current logged in username
    //if there is currently no logged in user, the page will referred to login. If there is a user, the page will go to the /history page belonging to that user
        .done(function (data) {
            callback(data);
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}
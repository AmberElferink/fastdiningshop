//this javascript file will check if the user is loged in and change the nav bar accordingly.
//if the user is loged in he can check his history, edit his profile and log out. if not than he can log in.

setUserButtons();

function setUserButtons()
{
    $.ajax({
        type: 'GET',
        url: './loginValidate',
        dataType: 'text',
    })
    //gets the current logged in username
    //if there is currently no logged in user, the page will referred to login
    //if there is a user, the page will go to the /history page belonging to that user
        .done(function (data) {
            //if the user is nog loged in
            if(data == false) {
                $('#loginButton').show();
                $('#editProfileButton').hide();
                $('#historyButton').hide();
                $('#logoutButton').hide();
            }
            else {
                //if the user is loged in
                $('#loginButton').hide();
                $('#editProfileButton').show();
                $('#historyButton').show();
                $('#logoutButton').show();
            }
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
}


//if the logout button is clicked on
$('#logoutButton').click(function () {
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


//if the history button is clicked
$('#historyButton').click(function () {
    $.ajax({
        type: 'GET',
        url: './loginValidate',
        dataType: 'text',
    })//gets the current logged in username
    //if there is currently no logged in user, the page will referred to login. If there is a user, the page will go to the /history page belonging to that user
        .done(function (data) {
            if(data == false) {
                window.location.assign('./login');
            }
            else {
                window.location.assign('./history?user=' + data);
            }
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
});

//if the edit button is clicked
$('#editProfileButton').click(function () {
    $.ajax({
        type: 'GET',
        url: './loginValidate',
        dataType: 'text',
    })//gets the current logged in username
    //if there is currently no logged in user, the page will referred to login. If there is a user, the page will go to the /history page belonging to that user
        .done(function (data) {
            if(data == false) {
                window.location.assign('./login');
            }
            else {
                window.location.assign('./profile?user=' + data);
            }
        })
        //als het niet goed is gegaan, doet hij de fail hieronder
        .fail(function (jqXHR, textStatus, err) {
            console.log('AJAX error response:', textStatus);
        });
});

console.log("navbar javascript loaded");
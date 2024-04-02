$(function() {

    if(isUserLogged()) {
        window.location.replace("index.html");
    }

    let loginEmail = $('#loginEmail').val();
    let loginPassword = $('#loginPassword').val();

    checkLoginAndPassword(loginEmail, loginPassword);

    $("#loginEmail, #loginPassword").on("change paste keyup", function() {
        checkLoginAndPassword($('#loginPassword').val(), $('#loginEmail').val());
    });

    // TODO Make petition to API
    $( "#login-form" ).on( "submit", function( event ) {

        event.preventDefault();

        hideLoginError();
        showButtonSpinner();

        setTimeout(() => {
            let loginEmail = $('#loginEmail').val();
            let loginPassword = $('#loginPassword').val();


            $.ajax("https://"+window.location.hostname+":3333/login", {
                data: JSON.stringify({
                    "Email": loginEmail,
                    "Contrasenya": loginPassword
                }),
                contentType: 'application/json',
                type: 'POST',
            }).done(function (data) {
                
                console.log(data)
                localStorage.setItem('token', data.token )
                console.log('token desde login')
                console.log(localStorage.getItem('token'))
                // Evitar cookies
               // setCookie('token', data.token, 365);
                window.location.replace("index.html");
            }).fail(function () {
                showLoginError();
            });

            removeButtonSpinner();
        }, 1000);
    });
});

function checkLoginAndPassword(
    loginEmail, loginPassword,
){
    if(loginEmail !== '' && loginPassword !==''){
        $('#btnLogin').removeClass('disabled');
    } else {
        $('#btnLogin').addClass('disabled');
    }
}

function showButtonSpinner(){
    $('#btnLogin').html('<i class="fas fa-spinner fa-spin"></i>');
    $('#btnLogin').addClass('disabled');
}

function removeButtonSpinner(){
    $('#btnLogin').html('Login');
    $('#btnLogin').removeClass('disabled');
}
function showLoginError(){
    $('.error-message-login').show();
    $('.error-message-login').text('Usuari i/o contrasenya incorrectes');
}

function hideLoginError(){
    $('.error-message-login').hide();
    $('.error-message-login').text('');
}
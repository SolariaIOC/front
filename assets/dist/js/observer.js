import {userLogin, modoLogueado} from "./login.js";
(()=>{console.log("OBSERVADOR INICIADO")})()



const barraNavegacionContainer = document.getElementById('barra-navegacion');
const modalLoginContainer = document.getElementById('login-modal-container');
const modalMessageContainer = document.getElementById('message-modal-container');

console.log("Mutation Observer")
const mutationObserver = new MutationObserver((mutations) => {
    
    let mutacionId = mutations[0].target.firstChild.id;
  
    switch(mutacionId){
        case "staticBackdrop": console.log('MODAL: staticBackdrop cargado ...');
        userLogin();
        break;
        case "navbar": console.log('NAVBAR cargado ...');
        modoLogueado();
        break;
        case "message-modal": console.log('MODAL MESSAGE cargado ...')
        break;
    }


})



mutationObserver.observe(barraNavegacionContainer, {childList:true})
mutationObserver.observe(modalLoginContainer, {childList:true})
mutationObserver.observe(modalMessageContainer, {childList:true})


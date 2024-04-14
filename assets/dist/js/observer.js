import {userLogin, modoLogueado,  modoLogueadoDashboard} from "./login.js";
import { addInmoble } from "./inmoble.js";
(()=>{console.log("OBSERVADOR INICIADO")})()


let dashboard =  "/dashboard.html" ;
let ruta = window.location.pathname ;

const barraNavegacionContainer = document.getElementById('barra-navegacion');
const modalLoginContainer = document.getElementById('login-modal-container');
const modalMessageContainer = document.getElementById('message-modal-container');

/* DASHBOARD */
const contenidoDashboard = document.getElementById('page-content')
const barraTop = document.getElementById('top-bar')
const barraDashboardDer = document.getElementById('sidebar');




console.log("Mutation Observer")
const mutationObserver = new MutationObserver((mutations) => {
    
    console.log(mutations)
    console.log(mutations[0].target.firstChild.id)
   //.childNodes[7].childNodes[3].childNodes[1].childNodes[1].id
    
    let mutacionId = mutations[0].target.firstChild.id;

  
    switch(mutacionId){
        case "staticBackdrop": console.log('MODAL: staticBackdrop cargado ...');
        userLogin();
        break;
        case "navbar": console.log('NAVBAR cargado ...');
        modoLogueado();
        break;
        case "message-modal": console.log('MODAL MESSAGE cargado ...');
        break;
        /*DASHBOARD */
        case "barraNavegacionDashBoard":  modoLogueadoDashboard();
        break;
        case "formularioInmobleContainer": addInmoble();
        break;
        
    }


})




if(ruta == dashboard){

    mutationObserver.observe(contenidoDashboard, {childList:true})
    mutationObserver.observe(barraTop, {childList:true})

}else {



    mutationObserver.observe(barraNavegacionContainer, {childList:true})
    mutationObserver.observe(modalLoginContainer, {childList:true})
    mutationObserver.observe(modalMessageContainer, {childList:true})

}




import {userLogin, modoLogueado,  modoLogueadoDashboard} from "./login.js";
import { addInmoble , pintarInmuebles, likeInmueble} from "./inmoble.js";
(()=>{console.log("OBSERVADOR INICIADO")


//window.addEventListener("beforeunload", () => localStorage.removeItem('usuario'));

let dashboard =  "/dashboard.html" ;
let ruta = window.location.pathname ;

const barraNavegacionContainer = document.getElementById('barra-navegacion');
const modalLoginContainer = document.getElementById('login-modal-container');
const modalMessageContainer = document.getElementById('message-modal-container');

/* DASHBOARD */
const contenidoDashboard = document.getElementById('page-content')
const barraTop = document.getElementById('top-bar')
const barraDashboardDer = document.getElementById('sidebar');

/* PAGINA DE INMUEBLES */

const inmueblesContainer = document.getElementById('inmobles');






console.log("Mutation Observer")
const mutationObserver = new MutationObserver((mutations) => {
    
   // console.log(mutations)
   // console.log(mutations[0].target.firstChild.id)

    
    let mutacionId = mutations[0].target.firstChild.id;

  
    switch(mutacionId){
        case "staticBackdrop": userLogin();
        break;
        case "navbar":modoLogueado();
        break;
        case "message-modal":;
        break;
        /*DASHBOARD */
        case "barraNavegacionDashBoard":  modoLogueadoDashboard();
        break;
        case "inmuebles-container": pintarInmuebles();likeInmueble();
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

    /* INMUEBLES */
    mutationObserver.observe(inmueblesContainer, {childList:true})

}

})()


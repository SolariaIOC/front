import {userLogin, modoLogueado,  modoLogueadoDashboard} from "./login.js";
import { addInmoble , pintarInmuebles, likeInmueble, formularioBusquedaInmuebles, verTodosInmuebles, getAllInmoblesInformation} from "./inmoble.js";
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

/* PAGINA DE INMUEBLES  INDEX*/

const inmueblesContainer = document.getElementById('inmobles');
const busquedaContainer = document.getElementById('busqueda-container');


/* BUSCA EL CAMBIO EN EL CONTENEDOR Y COMPRUEBA SI SE HA PINTADO EL HIJO SI ES ASÍ EJECUTA LAS FUNCIONES */

const mutationObserver = new MutationObserver((mutations) => {
    

    
    let mutacionId = mutations[0].target.firstChild.id;
    //console.log(mutations[0])

   // console.log(mutacionId)
  
    switch(mutacionId){
        /*MODAL */
        case "staticBackdrop": userLogin();
        break;
        /*BARRA DE NAVEGACIÓN */
        case "navbar":modoLogueado();
        break;

        case "message-modal":;
        break;
        /*DASHBOARD */
        case "barraNavegacionDashBoard":  modoLogueadoDashboard();
        break;
        /*INMUEBLES */
        case "inmuebles-container": pintarInmuebles(); likeInmueble(); 
        break;
        /*BUSQUEDA */
        case "busqueda":formularioBusquedaInmuebles();verTodosInmuebles();
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
    
    /*BUSQUEDA*/
    mutationObserver.observe(busquedaContainer, {childList:true})

}

})()


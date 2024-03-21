import { renderizaFragmento } from "./utils/modularizacionHtml.js";
import { decodificaJWT } from "./utils/token.js";
import { hideNav } from "./utils/hideNav.js";

if(window.location.pathname === '/'){
     window.location.replace("index.html");
}

/* FUNCIONES GENERALES */

/*Animacion de la barra de navegación*/
hideNav()

/* RENDERIZACIÓN DE ELEMENTOS COMPARTIDOS */

renderizaFragmento("#barra-navegacion","./components/nav.html");
renderizaFragmento("#footer","./components/footer.html");    

/* RENDERIZACIÓN ESPECIFICA */

let ruta =  window.location.href;


if(ruta.includes("index")){
     renderizaFragmento("#inmobles","./components/inmobles.html");
     renderizaFragmento("#promo","./components/promo.html");
     renderizaFragmento("#login-modal","./components/login-modal.html");    
}

if(ruta.includes("registre")){ 
    renderizaFragmento("#login-modal","./components/login-modal.html");  
  
    renderizaFragmento("#registre-form","./components/registre-form.html");

   
}



//REDIRIGE A
//window.location.assign()

let token = getCookie("token");

if(token !== undefined || token !=='') {

     let usuario = decodificaJWT(token);

     console.log(usuario);

     if(usuario !== null) {
          localStorage.setItem('usuario', JSON.stringify(usuario));

          const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));

          console.log('usuario en local storage')
          console.log(usuarioLocal);

          console.log(usuario)
          console.log( decodificaJWT(token) )
     }
}

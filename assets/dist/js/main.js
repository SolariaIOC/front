import { renderizaFragmento } from "./utils/modularizacionHtml.js";
import { renderComponent } from "./utils/components.js";
import { decodificaJWT } from "./utils/token.js";
import { hideNav } from "./utils/hideNav.js";



/* FUNCIONES GENERALES */

/*Animacion de la barra de navegación*/
hideNav()

/* RENDERIZACIÓN DE ELEMENTOS COMPARTIDOS */

renderizaFragmento("#barraDeNavegacion","./components/nav.html");
renderizaFragmento("#footer","./components/footer.html");    

/* RENDERIZACIÓN ESPECIFICA */

let ruta =  window.location.href;
if(ruta.includes("registre")){
    

}

if(ruta.includes("index")){

     renderizaFragmento("#inmobles","./components/inmobles.html");
     renderizaFragmento("#promo","./components/promo.html");
     renderizaFragmento("#loginModal","./components/login-modal.html");    
}


//REDIRIGE A
//window.location.assign()


















let token = getCookie("token");

if(token !== undefined) {
     let usuario = decodificaJWT(token);
     localStorage.setItem('usuario', JSON.stringify(usuario));
     const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));
     console.log('usuario en local storage')
     console.log(usuarioLocal)
}







console.log(usuario)




console.log( decodificaJWT(token) )









/*

function getCookies(name) {
     const cookies = document.cookie.split(';'); // Divide la cadena de cookies en un arreglo
     for (let i = 0; i < cookies.length; i++) {
         const cookie = cookies[i].trim(); // Elimina espacios en blanco al principio y al final de la cookie
         // Verifica si la cookie comienza con el nombre buscado
         if (cookie.startsWith(name + '=')) {
             return cookie.substring(name.length + 1); // Retorna el valor de la cookie, omitiendo el nombre y el signo '='
         }
     }
     return null; // Retorna null si no se encontró la cookie
 }
 
 // Ejemplo de uso:
 const token = getCookie('token');
 if (token) {
     console.log('El valor de la cookie "token" es:', token);
 } else {
     console.log('No se encontró la cookie "token"');
 }

 */
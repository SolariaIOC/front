import { renderizaFragmento } from "./utils/modularizacionHtml.js";
import { decodificaJWT } from "./utils/token.js";
import { hideNav } from "./utils/hideNav.js";
import { getApiURL } from "./utils.js";
import { logout } from "./login.js";
import {
  registerUser,
  isUserLoged,
  getUsers,
  getLocalUser,
  getUser,
  fillTablaUsuarios
} from "./users.js";

import{
  fillTablaInmobles,
  getAllInmobles,
  getMyInmobles,
  getInmoblesPerCodiPostal,
  getInmoblePerPoblacio ,
  addInmoble,
  removeInmoble,
  pintarInmuebles
} from "./inmoble.js"

if (window.location.pathname === "/") {
  window.location.replace("index.html");
}



/* FUNCIONES GENERALES */

/*Animacion de la barra de navegación*/
hideNav();

/* RENDERIZACIÓN DE ELEMENTOS COMPARTIDOS */

await renderizaFragmento("#barra-navegacion", "./components/nav.html");
await renderizaFragmento("#footer", "./components/footer.html");

/* RENDERIZACIÓN ESPECIFICA */

const ruta = window.location.href;

if (ruta.includes("index")) {
  // TODO PETICION MIDDLE WARE PARA SABER SI HAY USUARIO LOGUEADO
  // TODO AL CERRAR QUITAR USUARIO DEL LOCAL
  await renderizaFragmento("#inmobles", "./components/inmobles.html");
  await renderizaFragmento("#promo", "./components/promo.html");
  await renderizaFragmento("#login-modal-container", "./components/login-modal.html");
  await renderizaFragmento("#message-modal-container","./components/message-modal.html");



}

if (ruta.includes("registre")) {

  await renderizaFragmento("#login-modal-container", "./components/login-modal.html");
  await renderizaFragmento("#message-modal-container","./components/message-modal.html");
 // renderizaFragmento("#registre-form", "./components/registre-form.html");
}

if (ruta.includes("registre-inmoble")) {
  await  renderizaFragmento("#login-modal-container", "./components/login-modal.html");
  await renderizaFragmento("#message-modal-container","./components/message-modal.html");

}

/*

if (ruta.includes("dashboard")) {
  await renderizaFragmento("#datos-usuari", "./components/datos-usuari.html");
  await renderizaFragmento("#table-content-llista-usuaris", "./components/llista-usuaris.html");
  await renderizaFragmento("#table-content-llista-inmobles", "./components/llista-inmobles.html");

  await renderizaFragmento("#login-modal-container", "./components/login-modal.html");
  await renderizaFragmento("#message-modal-container","./components/message-modal.html");

  console.log("Hay usuario logueado?")

let usuari = isUserLoged();
console.log(usuari)
  if(usuari != null){
    if(usuari.tipoDeUsuari == "A"){

      fillTablaUsuarios(usuaris);
      let usuaris = await getUsers(rutaAPI);
    }

    let inmobles = await getMyInmobles(usuari);
  
    console.log('mis inmobles')
    console.log(inmobles)
  
  
  
    fillTablaInmobles(inmobles);
  }

}
*/



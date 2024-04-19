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


/* RENDERIZACIÓN ESPECIFICA */

const ruta = window.location.href;

if (ruta.includes("index")) {
  // TODO PETICION MIDDLE WARE PARA SABER SI HAY USUARIO LOGUEADO
  // TODO AL CERRAR QUITAR USUARIO DEL LOCAL
  await renderizaFragmento("#login-modal-container", "./components/login-modal.html");
  await renderizaFragmento("#busqueda-container", "./components/busqueda.html");
  await renderizaFragmento("#inmobles", "./components/inmobles.html");


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

await renderizaFragmento("#footer", "./components/footer.html");

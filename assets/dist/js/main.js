import { renderizaFragmento } from "./utils/modularizacionHtml.js";

import { decodificaJWT } from "./utils/token.js";
import { hideNav } from "./utils/hideNav.js";
import {
  registerUser,
  getUsers,
  getLocalUser,
  getUser,
  fillTablaUsuarios
} from "./utils/users.js";

import{fillTablaInmobles, getAllInmobles, getMyInmobles,getInmoblesPerCodiPostal ,getInmoblePerPoblacio , addInmoble ,removeInmoble } from "./inmoble.js"

const rutaAPI = "http://"+window.location.hostname+":3333";
//let token =  localStorage.getItem('token');



console.log("location");
if (window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1" ) {
  console.log("Dev");
} else {
  console.log("Production");
}

if (window.location.pathname === "/") {
  window.location.replace("index.html");
}
const mainContent = document.querySelector("main-content");

/* FUNCIONES GENERALES */

/*Animacion de la barra de navegación*/
hideNav();

/* RENDERIZACIÓN DE ELEMENTOS COMPARTIDOS */

renderizaFragmento("#barra-navegacion", "./components/nav.html");
renderizaFragmento("#footer", "./components/footer.html");

/* RENDERIZACIÓN ESPECIFICA */

const ruta = window.location.href;

if (ruta.includes("index")) {
  renderizaFragmento("#inmobles", "./components/inmobles.html");
  renderizaFragmento("#promo", "./components/promo.html");
  renderizaFragmento("#login-modal-container", "./components/login-modal.html");
  renderizaFragmento("#message-modal-container","./components/message-modal.html");
}

if (ruta.includes("registre")) {
  renderizaFragmento("#login-modal", "./components/login-modal.html");
 // renderizaFragmento("#registre-form", "./components/registre-form.html");
}

if (ruta.includes("registre-inmoble")) {


}



if (ruta.includes("dashboard")) {
  renderizaFragmento("#datos-usuari", "./components/profile-data.html");
  renderizaFragmento("#table-content-llista-usuaris", "./components/llista-usuaris.html");
  renderizaFragmento("#table-content-llista-inmobles", "./components/llista-inmobles.html");

  let usuaris = await getUsers(rutaAPI);

  let inmobles = await getMyInmobles(token);

  console.log('mis inmobles')
  console.log(inmobles)
  //console.log("usuarios recogidos:");
  //console.log(usuaris);

  fillTablaUsuarios(usuaris);
  fillTablaInmobles(inmobles);
}





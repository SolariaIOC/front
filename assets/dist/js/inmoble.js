import { getApiURL } from "./utils.js";
import { checkLog } from "./login.js";

// Tipo de usuario A - R

const url = getApiURL();

//FORMULARIO INMOBLE

let inmobles = new Array();
let meuInmobles = new Array();


/**
 * @description Fa una sol·licitud de tots els immobles de la base de dades.
 * @param {number} pag  Nombre de pàgina
 * @returns {array} immobles
 */
export async function getAllInmobles(pag = 1) {
  inmobles = [];
  await fetch(url + "/immobles/?page=" + pag, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('tipoDeBusqueda')
      localStorage.removeItem('paginacion')
      localStorage.setItem('tipoDeBusqueda', 'all')
      localStorage.setItem('paginacion', JSON.stringify(data.pagination))
      data.results.forEach(async (element) => {
        inmobles.push(await element);
      });
    });
  return inmobles;
}



/*********************************************************************/
/************        ¿      SE UTILIZAN   ?             *************/
/**
 * @description Fa una sol·licitud de tots els immobles de la base de dades.
 * @param {*} pag
 * @returns
 */

export async function getAllInmoblesInformation(pag = 1) {

  if(pag === undefined){
    console.log("No se ha pasado una página");
  }

  return await fetch(url + "/immobles/?page="+pag, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('DATA...');
        console.log(data);
        return data;
      });
}

/**
 * @description Petición de toda la lista de inmuebles de un usuario
 * @returns
 */
export async function getMyInmobles() {
  
  meuInmobles = [];

  await fetch(url + "/immobles/r", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((resp) => resp.json())
  .then((data) => {
    console.log("getMyInmobles: ");
    console.log(data);
    meuInmobles = data;
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
  return meuInmobles;
}



/*********************************************************************/

/**
 * @description Petició de tota la llista d'immobles favorits d'un usuari.
 * @returns
 */
export async function getMyFavInmobles() {
  meuInmobles = [];

  await fetch(url + "/favorits", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
      .then((resp) => resp.json())
      .then((data) => {
        meuInmobles = data;
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  return meuInmobles;
}

/**
 *@description filtre d'inmobles per códi postal.
 * @param {*} codiPostal
 * @param {number} pag  Nombre de pàgina.
 * @returns {Array} retorna un array d'inmobles.
 */
export async function getInmoblesPerCodiPostal(codiPostal, pag = 1) {

  await fetch(`${url}/immobles/codi_postal/${codiPostal}?page="` + pag, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  .then((response) => {
    if (!response.ok) {
      busquedaFail("No s'han trobat immobles amb aquest codi postal.");
      throw new Error('Error en la solicitud');
    }
    return response.json();
  })
  .then((json) => {
    busquedaOk();
    localStorage.removeItem('tipoDeBusqueda')
    localStorage.removeItem('paginacion')
      localStorage.setItem('tipoDeBusqueda', 'codiPostal')
      localStorage.setItem('paginacion', JSON.stringify(json.pagination))
      return (inmobles = json.results);
  })
  .catch((error) => {
    console.error('Error:', error);
   
    return inmobles = []; 
  });

  return inmobles;
}

/**
 * @description Filtre d'inmobles per població.
 * @param {*} poblacio
 * @param {number} pag  Nombre de pàgina.
 * @returns {Array} retorna un array d'inmobles.
 */
export async function getInmoblePerPoblacio(poblacio, pag = 1) {

  await fetch(`${url}/immobles/poblacio/${poblacio}?page="` + pag, {
    headers: {
      "Content-Type": "application/json",
    },
 
    credentials: "include"
  })
  .then((response) => {
    if (!response.ok) {
      busquedaFail("No s'han trobat immobles en aquesta població.");
      throw new Error('Error en la solicitud');
    
    }
    return response.json();
  })
  .then((json) => {
    inmobles = json.results;
      busquedaOk();
      localStorage.removeItem('tipoDeBusqueda')
      localStorage.removeItem('paginacion')
      localStorage.setItem('tipoDeBusqueda', 'poblacio')
      localStorage.setItem('paginacion', JSON.stringify(json.pagination))
 
    return inmobles;
  })
  .catch((error) => {
    console.error('Error:', error);
 
    inmobles = []; 
  });

  return inmobles;
}


/**
 * @description Afegeix un immoble.
 * @param {*} inmoble
 */
export async function addInmoble(inmoble) {
  await fetch(url + "/immobles/r/afegir", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inmoble),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.hasOwnProperty("error")) {
        console.log("ERROR");
        console.log(JSON.stringify(data));
        alert("No s'ha pogut crear correctament el immoble");
      }
      alert("Immoble registrat correctament.");
      window.location.assign("/dashboard.html");
    })
    .catch((error) => {
      console.error("Error en el registro de inmueble:", error.message);
      alert("No s'ha pogut crear correctament el immoble");
    });
}

/**
 * @description Afegeix un immoble com administrador.
 * @param {*} inmoble 
 */
export async function addInmobleAdmin(inmoble) {
  await fetch(url + "/immobles/a/afegirUsuariImmoble", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inmoble),
  })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.hasOwnProperty("error")) {
          console.log("ERROR");
          console.log(JSON.stringify(data));
          alert("No s'ha pogut crear correctament el immoble");
        }
        alert("Immoble registrat correctament.");
        window.location.assign("/dashboard.html");
      })
      .catch((error) => {
        console.error("Error en el registro de inmueble:", error.message);
        alert("No s'ha pogut crear correctament el immoble");
      });
}

/**
 * @description Elimina un immoble com administrador.
 * @param {int} id_immoble
 * @param {int} id_usuari
 */
export async function removeImmobleAdmin(id_immoble, id_usuari) {
  return await fetch(
    url + "/immobles/a/eliminarImmoble/" + id_immoble + "/" + id_usuari,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => resp.json())
    .then((json) => !json.hasOwnProperty("error"));
}

/**
 * @description Elimina un immoble.
 * @param {*} id_immoble
 */
export async function removeInmoble(id_immoble) {
  return await fetch(url + "/immobles/r/eliminar/" + id_immoble, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((json) => !json.hasOwnProperty("error"));
}

/*************/
/* FAVORITOS */
/*************/

/**
 * @description Afegeix el immoble a favorits. 
 * @param {*} id_immoble
 * @void
 */
export async function addInmobleFavorir(id_immoble) {
  await fetch(url + "/afegirImmobleFavorit", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ 'id_immoble': id_immoble }),
  })
      .then((resp) => resp.json())
    .then((json) => !json.hasOwnProperty("error"))
    .catch((error) => {
      console.error("Error al afegir un immoble", error.message);
    });
}

/**
 * @description Elimina un immoble de la llista de favorits.
 * @param {*} id_immoble 
 * @void 
 */
export async function removeInmobleFav(id_immoble) {
  return await fetch(url + "/eliminarImmobleFavorit", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 'id_immoble':id_immoble }),
  })
      .then((resp) => resp.json())
      .then((json) => !json.hasOwnProperty("error"));
}

/**
 * @description Actualizació de l'immoble.
 * @param {*} inmoble
 * @param {*} id_immoble
 */
export async function updateInmoble(inmoble, id_immoble) {
  await fetch(url + "/immobles/r/actualitzar/" + id_immoble, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inmoble),
  })
    .then((response) => {
      let error = true;

      if (response.ok === true) {
        let data = response.json();
        if (!data.hasOwnProperty("error")) {
          error = false;
          alert("Immoble actualitzat correctament!");
          window.location.hash = "immobles";
          window.location.reload();
        }
      }

      if (error) {
        alert("No s'ha pogut actualitzar correctament el immoble");
        console.log("Response: ");
        console.log(response);
      }
    })
    .catch((error) => {
      console.error("Error en la modificación de inmueble:", error.message);
      return false;
    });
}

/**
 * @description Actualització de l'immoble per l'administrador.
 * @param {*} inmoble
 * @param {*} id_immoble
 */
export async function updateInmobleAdmin(inmoble, id_immoble) {
  await fetch(url + "/immobles/a/actualitzar/" + id_immoble, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inmoble),
  })
      .then((response) => {
        let error = true;

        if (response.ok === true) {
          let data = response.json();
          if (!data.hasOwnProperty("error")) {
            error = false;
            alert("Immoble actualitzat correctament!");
            window.location.hash = "immobles";
            window.location.reload();
          }
        }

        if (error) {
          alert("No s'ha pogut actualitzar correctament el immoble");
          console.log("Response: ");
          console.log(response);
        }
      })
      .catch((error) => {
        console.error("Error en la modificación de inmueble:", error.message);
        return false;
      });
}



/*********************************************************************/
/*******                   REGISTRO USUARIO                   ********/
if (window.location.href.includes("register-inmobles")) {
  const formulariInmoble = document.getElementById(
    "registre-formulari-inmoble"
  );

  console.log("formulariInmoble");
  console.log(formulariInmoble);

  let token = localStorage.getItem("token");

  formulariInmoble.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const formData = new FormData(this);
    console.log("form Data");
    console.log(formData);

    const inmoble = {};
    formData.forEach((value, key) => {
      inmoble[key] = value;
    });

    console.log("Inmoble");
    console.log(inmoble);

    //console.log(checkToken(token));

    console.log("add inmoble");
    addInmoble(token, inmoble);
    formulariInmoble.reset();
  });
}
/*********************************************************************/



/*********************************************************************/
/*              LISTA DE INMOBLES  SE UTILIZA?                       */
export function fillTablaInmobles(inmobles) {
  const contenidoTabla = document.getElementById("contenido-en-tabla-inmobles");
  // let rowUsuario = document.createDocumentFragment();

  // CHECKEAR SI YA ESTA RENDERIZADO
  // NO AGRAGR EL USUARIO QUE LO ESTA CONSULTANDO

  inmobles.forEach((inmoble) => {
    let tr = document.createElement("tr");
    tr.setAttribute("scope", "row");

    let thId = document.createElement("th");
    thId.setAttribute("id", "id-" + inmoble.id_immoble);
    thId.textContent = inmoble.id_immoble;

    let tdCarrer = document.createElement("td");
    tdCarrer.setAttribute("Carrer", "Carrer-" + inmoble.Carrer);
    tdCarrer.textContent = inmoble.Carrer;

    let tdNumero = document.createElement("td");
    tdNumero.setAttribute("Numero", "Numero-" + inmoble.Numero);
    tdNumero.textContent = inmoble.Numero;

    let tdPis = document.createElement("td");
    tdPis.setAttribute("Pis", "Pis-" + inmoble.Pis);
    tdPis.textContent = inmoble.Pis;

    let tdCodi_Postal = document.createElement("td");
    tdCodi_Postal.setAttribute(
      "Codi_Postal",
      "Codi_Postal-" + inmoble.Codi_Postal
    );
    tdCodi_Postal.textContent = inmoble.Codi_Postal;

    let tdPoblacio = document.createElement("td");
    tdPoblacio.setAttribute("Poblacio", "Poblacio-" + inmoble.Poblacio);
    tdPoblacio.textContent = inmoble.Poblacio;

    let tdDescripcio = document.createElement("td");
    tdDescripcio.setAttribute("Descripcio", "Descripcio-" + inmoble.Descripcio);
    tdDescripcio.textContent = inmoble.Descripcio;

    let tdPreu = document.createElement("td");
    tdPreu.setAttribute("Preu", "Preu-" + inmoble.Preu);
    tdPreu.textContent = inmoble.Preu;

    let tdImatge = document.createElement("td");
    tdImatge.setAttribute("Imatge", "Imatge-" + inmoble.image);
    tdImatge.textContent = inmoble.image;

    let tdDeleteInmoble = document.createElement("td");
    let tdButton = document.createElement("button");
    let iconDelete = document.createElement("i");
    (iconDelete.classList = "fa"), "fa-close";
    iconDelete.setAttribute("aria-hidden", true);
    iconDelete.setAttribute("onClick", removeInmoble(inmoble));

    // AÑADIR ON CLICK CON COMPROBACIONES

    //  const { Carrer, Numero, Pis, Codi_Postal, Poblacio, Descripcio, Preu, Imatge } = req.body;

    tr.appendChild(thId);
    tr.appendChild(tdCarrer);
    tr.appendChild(tdNumero);
    tr.appendChild(tdPis);
    tr.appendChild(tdCodi_Postal);
    tr.appendChild(tdPoblacio);
    tr.appendChild(tdDescripcio);
    tr.appendChild(tdPreu);
    tr.appendChild(tdImatge);

    tdButton.append(iconDelete);
    tdDeleteInmoble.append(tdButton);
    tr.appendChild(tdDeleteInmoble);

    contenidoTabla.appendChild(tr);
  });
}
/*********************************************************************/


/*********************************************************************/
/*              LISTENER VER TODOS LOS INMUEBLES                     */ 
document.addEventListener('click' , async (evento)=>{

  if(evento.target.id  == 'ver-todos-inmuebles'){
    localStorage.removeItem('valorBusqueda')
    localStorage.removeItem('tipoBusqueda')
   
    busquedaPorTipo('all');
    clearPaginacion();
  }

  })
/*********************************************************************/

/**
 * @description Formulari de cerca.
 * @void
 */
export async function formularioBusquedaInmuebles(){
  //console.log("DENTRO DE FORMULARIO BUSQUEDA");
   let mensaje;

  const formularioBusquedaInmuebleElemento = document.getElementById('formulario-busqueda-inmuebles');
formularioBusquedaInmuebleElemento.addEventListener('submit', async (evento)=>{

  //Limpia el input
  localStorage.removeItem('valorBusqueda');
  localStorage.removeItem('tipoBusqueda');
 
  evento.preventDefault();

  let valorBusqueda = formularioBusquedaInmuebleElemento[0].value
  let tipoBusqueda =  formularioBusquedaInmuebleElemento[2].value

  localStorage.setItem('valorBusqueda',valorBusqueda )
  localStorage.setItem('tipoBusqueda',tipoBusqueda )

  if(valorBusqueda == ""){
     mensaje = "Ha de seleccionar un tipus de cerca una."
    mensajeBusquedaError(mensaje);
  }
  if(valorBusqueda == "" && tipoBusqueda == 'codiPostal'){
    mensaje = "Ha d'introdui un codi postal";
    mensajeBusquedaError(mensaje);
  }

  if(valorBusqueda == "" && tipoBusqueda == 'poblacio'){
    mensaje = "Ha d'introdui un poblacio";
    mensajeBusquedaError(mensaje);
  }

  if(valorBusqueda){
    busquedaPorTipo(tipoBusqueda, valorBusqueda);
  }
 
  evento.originalTarget[0].value = "";
})


}

/**
 * @description Control de cerca. Cerca segons el tipus de cerca i crea la paginació.
 * @param {*} pagina
 * @void
 */
export async function busquedaPorTipo(pagina){
  let tipoBusqueda = localStorage.getItem('tipoBusqueda');
  let valorBusqueda = localStorage.getItem('valorBusqueda');
  let inmuebles = new Array();

    switch(tipoBusqueda){
      case 'codiPostal' : inmuebles = await getInmoblesPerCodiPostal(valorBusqueda, pagina);
      clearPaginacion();
      break;
      case 'poblacio':  inmuebles =  await getInmoblePerPoblacio(valorBusqueda, pagina);
      clearPaginacion();
      break;
      default :inmuebles = await getAllInmobles(pagina);
      break;
    }
  
 await pintarInmuebles( inmuebles);
       crearPaginacion();
  console.log('creando paginacionde en la busqueda')
          
    }

/*********************************************************************/
/* MENSAJES BUSQUEDAS */

 /**
  * @description Afegeix un missatge de fallada a la cerca d'immobles.
  * @param {*} mensaje 
  */
 function busquedaFail(mensaje){
  const busquedaMensaje = document.getElementById('busqueda-mensaje');
  busquedaMensaje.classList.remove('visually-hidden');
  busquedaMensaje.firstChild.nextSibling.textContent =  mensaje;
 }

 /**
  * @description Mostra el missatge de cerca.
  */
 function busquedaOk(){
  const busquedaMensaje = document.getElementById('busqueda-mensaje');
  busquedaMensaje.classList.add('visually-hidden');
 }

 /**
  * @description Mostra un missatge d'error.
  * @param {*} mensaje 
  */
 function mensajeBusquedaError(mensaje){
  const busquedaMensaje = document.getElementById('busqueda-mensaje');
  busquedaMensaje.classList.remove('visually-hidden');
  busquedaMensaje.firstChild.nextSibling.textContent =  mensaje;
 }

 /*********************************************************************/
 /*                         CONTROL DE USUARIO                        */
/**
 * @description Controla si l'usuari ha iniciat sessió.
 */
export function controlLogin() {
  checkLog();
}

/*********************************************************************/
/* LIKE INMOBLE */

/**
 * @description Conté un eventListener que verifica si es fa clic en un cor o no.
 * Comprova l'estat del mateix, si té la classe liked és que agrada a l'usuari i el que fa és treure-li la classe i viceversa.
*/
export function likeInmueble() {
// carga los favoritos

  document.addEventListener("click", async (elemento) => {
    
    // Comprobar si clica en el corazon
    // COMPROBAR SI ESTA LOGUEADO
    // COMPROBAR SI TIENE CORAZON ROJO O NO
    // COMPROBAR SI ESTA EN LA LISTA DE FAVORITOS DEL USUARIO
    // SI NO ESTA SE AÑADE
    
    
    let clases = elemento.target.classList;

    console.log('CORAZON')
    console.log(clases.contains("liked"));
    if (clases.contains("liked")) {
      console.log('corazon clicado');
      if (checkLog()) {
        console.log('usuario logueado')
        console.log(localStorage.getItem('usuario'))
        if (clases.contains("fa-heart-o")) {   
          console.log('tiene el corazón vacio se añade a favoritos')
          console.log(await getMyFavInmobles())
          await addInmobleFavorir(elemento.target.offsetParent.id);
          console.log('id del nuevo inmueble en favoritos')
          console.log(elemento.target.offsetParent.id)
          console.log(await getMyFavInmobles())

          likeCorazon(clases);
          cargarFavoritos();
        
      } else {
        
          await removeInmobleFav(elemento.target.offsetParent.id);
          dislikeCorazon(clases); 
          cargarFavoritos(); 
        }
       
      } else {
        console.log("no esta logueado al modal...");
        modalShow();
      }
    }
  });
}

document.addEventListener('load', ()=>{
 
})




/**
 * @description Guarda els favorits a la memòria local si estem connectats.
 */
export async function cargarFavoritos(){

  localStorage.removeItem('favoritos');

  let favoritos = await getMyFavInmobles();

  let favoritosArray =  new Array();

  if (checkLog() &&  favoritos) {

  favoritos.forEach( e => {    
          favoritosArray.push(e.id_immoble)     
    })
    
    localStorage.setItem('favoritos', favoritosArray);
    }
}

/**
 * @description Comprova si l'immoble està als preferits.
 * @param {*} id_immoble 
 * @returns 
 */
function esFavorito(id_immoble ){

  let id_immobleString = id_immoble.toString();
  let favoritos;
  if(localStorage.getItem('favoritos')){
      favoritos = localStorage.getItem('favoritos').split(',');
  }
  return  favoritos !=  undefined ? favoritos.includes(id_immobleString) :  false
}

/**
 * @description Activa el modal d'inici de sessió.
 */
function modalShow() {
  let modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
 modal.show();
}
 
/**
 * @description Elimina la classe del cor verd i posa la buida.
 * Rep com a paràmetre una llista de classes del pare.
 * @param {*} clases
 */
function dislikeCorazon(clases) {
  //console.log("dislike");
   clases.remove("fa-heart");
   clases.add("fa-heart-o");
}
 
/**
 * @description Elimina la classe del cor buit i posa la plena.
 * @param {*} clases Rebut com a paràmetre una llista de classes del pare.
 */
function likeCorazon(clases) {
  //console.log("like");
   clases.remove("fa-heart-o");
   clases.add("fa-heart");
}

/*********************************************************************/
/* PAGINACION */

  document.addEventListener("click", (evento) => {

  
    console.log("PAGINACION ACTIVO O NO");
     console.log(evento.target);
    let raiz = evento.target.parentElement.parentElement.parentElement.id;
    console.log(raiz);
    if(raiz == 'paginacion'){
      let pagina = evento.target.parentElement.id;
      let paginas = evento.target.parentElement.parentElement.children.length;
      if(paginas){
        for(let i=0; i <paginas; i++){
          console.log(          evento.target.parentElement.parentElement.children[i].classList
        )
          evento.target.parentElement.parentElement.children[i].classList.remove('active')
         }
         evento.target.parentElement.classList.add("active");
        
      }
      busquedaPorTipo(pagina)
    }

  });

/**
 * @description Neteja la paginació.
 * @void
 */
function clearPaginacion(){
  let paginacionPadre = document.getElementById('paginacion');
  //console.log('PaGINACION CLEAR')
  //console.log(paginacionPadre);

    //Limpia la paginación
    if (paginacionPadre.children) {
      while (paginacionPadre.firstChild) {
        paginacionPadre.firstChild.remove();
    }}
/*
 let cantidadDePaginas = paginacionPadre.firstChild.children.length
 for(let i=0; i <cantidadDePaginas; i++){
  paginacionPadre.firstChild.children[i].classList.remove('active')
 }
  paginacionPadre.firstChild.firstChild.classList.add("active");
  */
}

/**
 * @description Crea la paginació agafant el nombre de pàgines.
 * @void
 */
export function crearPaginacion() {

  let paginacionDatos = JSON.parse(localStorage.getItem('paginacion'));
  const pagina = document.getElementById("paginacion");
  let navegacionPaginas = document.createElement("nav");
  let contenedorPaginas = document.createElement("ul");

  console.log('DATOS PAG')
  console.log()

if(paginacionDatos.currentPage == 1){

  const navegacionPaginasSel = document.getElementById('navegadorPaginas')
  

pagina.classList.add(
  'container',
  "d-flex",
  "justify-content-end",
  'my-3'
)

  if(paginacionDatos.totalPages > 1 && pagina.children.length == 0){
  
  navegacionPaginas.setAttribute("aria-label", "...");
  navegacionPaginas.setAttribute('id', 'navegadorPaginas')

  contenedorPaginas.classList.add(
    "col-3",
    "d-flex",
    "justify-content-end",
    "align-items-center",
    "pagination",
   
  );

  for (let i = 1; i < paginacionDatos.totalPages + 1; i++) {
    let pagina = document.createElement("li");
    pagina.classList.add("page-item");
    pagina.setAttribute('id', i)
    i == 1 ? pagina.classList.add("active") : pagina.classList.remove("active") 
    let a = document.createElement("a");
    a.classList.add("p-3", "page-link");
    a.textContent = i;

    pagina.appendChild(a);
    contenedorPaginas.appendChild(pagina);

  }

  pagina.append(contenedorPaginas);

  } else {
   // pagina.firstChild.remove;  
  }
}

}

/*********************************************************************/
/* SELECCION INMUEBLE */

document.addEventListener('click', (evento)=>{

  console.log('SELECCIÓN INMUEBLE')
  console.log(evento.target.parentElement.classList[0])
let clickEn = evento.target.parentElement.classList[0];
let idImmoble;

if(clickEn == 'card' ){
  console.log('dentro card')
  console.log(evento.target.parentElement.id)
  idImmoble = evento.target.parentElement.id;
  detalleInmueble(inmobles, idImmoble);
}
if(clickEn == 'card-body' || clickEn == 'card-footer'){
  console.log('dentro de card-body o card-footer');
  console.log(evento.target.parentElement.parentElement.id)
  idImmoble = evento.target.parentElement.parentElement.id;
  detalleInmueble(inmobles, idImmoble);
  }
  console.log('inmuebles');
  console.log(inmobles)
})

/**
 * @description T'envia al detall de l'immoble seleccionat.
 * @param {*} inmobles 
 * @param {*} idImmoble 
 */
function detalleInmueble(inmobles, idImmoble){
    //GUARDA INMUEBLE EN LOCAL Y REDIRIGE
    inmobles.forEach(async (immoble)=>{
      console.log('DENTRO DE FOREACH INMOBLE')
      if( await immoble.id_immoble == idImmoble ){
        localStorage.removeItem('immoble');
        localStorage.setItem('immoble',  JSON.stringify(immoble));
        window.location.assign('./immoble-details.html')
      }
  
  })
}

/*********************************************************************/
/* HIPOTECA */

/**
 * @description Càlcul d'hipoteca que aplica un interès fix del 5%.
 * @param {*} quantitat Quantitat de diners demanada.
 * @param {*} anys  Anys per tornar-ho.
 * @returns {array} Quota mensual i deute total del préstec.
 */
function calcularHipoteca( quantitat, anys){

       // Calcular l'import total a tornar (prèstec + interessos)
       const interesAnual = 0.05; 
       const interesMensual = interesAnual / 12; 
       const numPagaments = anys * 12; 
       const quotaMensual = (quantitat * interesMensual) / (1 - Math.pow(1 + interesMensual, -numPagaments));
       const totalAPagar = quotaMensual * numPagaments;

       // Preparar i enviar la resposta com un objecte JSON
       let resultado = new Array();
       resultado.push(quotaMensual.toFixed(2));
       resultado.push(totalAPagar.toFixed(2));

       return resultado;
}

/**
 * @description Carrega els detalls de l'immoble.
 * @void
 */
export function cargarDetallesImmoble(){

  let immoble = JSON.parse(localStorage.getItem('immoble'));
  let immobleHTML =  document.getElementById('immoble-container');
  let detalles = crearMaquetacionInmueble(immoble, false);


immobleHTML.appendChild(detalles);

let calcularHipotecaBtn = document.getElementById('calcularHipotecaBtn');
let hipotecaForm = crearMaquetacioncalcularHipoteca();
let formHipoteca; 



calcularHipotecaBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    immobleHTML.appendChild(hipotecaForm); 
    formHipoteca = document.getElementById('formHipoteca');  
    let calculaButton = document.getElementById('calculaButton');  

    formHipoteca.addEventListener('change', ()=>{
      let anysLabel = document.getElementById('anysLabel');
      let anysInput = document.getElementById('anys')
      anysLabel.innerHTML = 'Anys: '+ anysInput.value;
    })

    calculaButton.addEventListener('click',  (evento)=>{
      console.log(evento)
  
      evento.preventDefault();
      console.log('DENTRO FORMULARIO CHANGE')

      
        let quantitat = document.getElementById('prestec');
        let anys = document.getElementById('anys');
        let resultado =  calcularHipoteca(quantitat.value, anys.value);
        let quota = document.getElementById('quotaHipoteca');
        let total = document.getElementById('resultadoHipoteca');
        let resultadosCard = document.getElementById('resultadosCard')

        if(!resultadosCard){
          formHipoteca.appendChild(crearMaquetacionResultadoHipoteca(resultado));
        }        
          quota.textContent = 'La quota mensual es: '  + resultado[0];
          total.textContent = 'El total del prestec es: '+resultado[1];
       
      })

})





}

/**
 * @description Pinta en HTML el resultat del càlcul de la hipoteca.
 * @param {array} resultado Resultat del càlcul de la hipoteca [quota, total].
 * @returns 
 */
function crearMaquetacionResultadoHipoteca(resultado){

  let card = document.createDocumentFragment();
  let divCardgroup = document.createElement("div");
  let divCard = document.createElement("div");
  let divCardBody = document.createElement("div");
  let quota = document.createElement("p");
  let total =  document.createElement('b');


  quota.setAttribute('id', 'quotaHipoteca');
  total.setAttribute('id', 'resultadoHipoteca');
  quota.textContent = 'La quota mensual es: '  + resultado[0];
  total.textContent = 'El total del prestec es: '+resultado[1];
  divCardgroup.setAttribute('id', 'resultadosCard');

  divCardBody.appendChild(quota);
  divCardBody.appendChild(total);
  divCard.appendChild(divCardBody);
  divCardgroup.appendChild(divCard)
  card.appendChild(divCardgroup);
return card;

}

/**
 * @description Fragment HTML amb la maquetació del formulari per al càlcul de la hipoteca.
 * @returns {card} 
 */
function crearMaquetacioncalcularHipoteca(){

  let card = document.createDocumentFragment();
  let divCardgroup = document.createElement("div");
  let divCard = document.createElement("div");
  let divCardBody = document.createElement("div");
  let form = document.createElement('form');
  let inputAnysLabel = document.createElement('label');
  let inputAnys = document.createElement('input');
  let inputPrestecLabel = document.createElement('label')
  let inputPrestec = document.createElement('input')
  //TODO CONTROL QUE SEAN NUMEROS. 

  let divButton = document.createElement('div');
  let buttonCalcula = document.createElement("submit");


/* FORM */
  form.classList.add('container','p-3')
  form.setAttribute('id', 'formHipoteca')

  inputAnysLabel.textContent = "Anys";
  inputAnysLabel.setAttribute('id', 'anysLabel');
  inputPrestecLabel.textContent = "Quantitat";


/* LABELS */
  inputAnysLabel.setAttribute('for', 'anys');
  inputAnysLabel.classList.add('form-label', 'mt-2');


  inputPrestecLabel.setAttribute('for', 'prestec');
  inputPrestecLabel.classList.add('form-label', 'mt-3');

/* INPUTS */
//type="password" class="form-control" id="loginPassword" placeholder="Contrasenya"
  inputPrestec.setAttribute('type', 'text');
  inputPrestec.setAttribute('id', 'prestec');
  inputPrestec.classList.add("col-6", "card-text", "text-start",  "d-flex",  "align-items-center")

  /* PRESTAC */
  inputAnys.classList.add('form-range' , 'col-6' )
  inputAnys.setAttribute('type', 'range');
  inputAnys.setAttribute('id', 'anys');
  inputAnys.setAttribute('min', 0);
  inputAnys.setAttribute('max', 40);
  inputAnys.setAttribute('step', 1);

/* BOTON CALCULA */

  divButton.appendChild(buttonCalcula);
  divButton.classList.add( 'd-grid',  'd-flex', 'justify-content-end');
  buttonCalcula.setAttribute('id', 'calculaButton');
  buttonCalcula.textContent = 'calcula';
  buttonCalcula.classList.add("btn", "btn-primary",  "col-3", 'mt-3');
  divCardgroup.classList.add("card-group");
  divCard.classList.add("card");

  /* CARD */
  form.appendChild(inputAnysLabel);
  form.appendChild(inputAnys);
  form.appendChild(inputPrestecLabel);
  form.appendChild(inputPrestec);
  form.appendChild(divButton);
  divCardBody.appendChild(form);
  divCard.appendChild(divCardBody);
  divCardgroup.appendChild(divCard)
  card.appendChild(divCardgroup);
  return card;

}

/*********************************************************************/
/* PINTAR INMUEBLES */

/**
 * Crea els elements HTML de l'immoble per mostrar.
 * 
 * @param {json} inmueble Es passa un immoble com a paràmetre.
 * @param {boolean} listado És un booleà, true si és de l'índex, false si és detall d'immoble.
 * @returns Retorna un element HTML.
 */
function crearMaquetacionInmueble(inmueble, listado) {
  //crea elementos de la tarjeta

/* BASE */
  let card = document.createDocumentFragment();

  let divCard = document.createElement("div");
  let imgCardImgTop = document.createElement("img");
  let divCardBody = document.createElement("div");
  let h5CardTitle = document.createElement("h5");
  let pCardText = document.createElement("p");
  let divCardfooter = document.createElement("div");
  let smallTextMuted = document.createElement("small");
  let smallLiked = document.createElement("small");
  let spanLiked = document.createElement("small");
  let divCardgroup = document.createElement("div");
  let buttonHipoteca = document.createElement("button");
  let divMaquetacionFooter = document.createElement("div");

  /* DETALLE */

 let pLocalizacion = document.createElement('p');
 let bPreu = document.createElement('b');
  h5CardTitle.textContent = "immoble a, " + inmueble.Poblacio;
  pCardText.textContent = inmueble.Descripcio;
  pLocalizacion.textContent = inmueble.Carrer +', ' +inmueble.Numero +', '+ inmueble.Pis +', '+  inmueble.Codi_Postal +', '+  inmueble.Poblacio;
  bPreu.textContent =  inmueble.Preu + ' €';
  imgCardImgTop.src = inmueble.Imatge ? inmueble.image :  "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE";
  divCardgroup.classList.add("card-group");
  divCard.classList.add("card");
/* HIPOTECA */
  buttonHipoteca.textContent = "calcula hipoteca";
  buttonHipoteca.classList.add("btn", "btn-primary", "p2", "col-3");
  buttonHipoteca.setAttribute('id','calcularHipotecaBtn' );
  divCardgroup.classList.add('card-group','m-auto');
  divCard.classList.add("card", 'mt-5');
  divCard.setAttribute( 'id', inmueble.id_immoble);
  imgCardImgTop.classList.add("card-img-top");
  imgCardImgTop.setAttribute("alt", inmueble.Descripcio);
  divCardBody.classList.add("card-body");
  h5CardTitle.classList.add("card-title", "text-start", "title-inmoble");
  /* TEXTOS */
  pCardText.classList.add("card-text", "text-start", "decripcion-inmoble");
  pLocalizacion.classList.add("card-text", "text-start", "decripcion-inmoble");
  /* PRECIO */
  bPreu.classList.add("col-4", "card-text",  "d-flex",  "align-items-center");
  divCardfooter.classList.add("card-footer");
  divMaquetacionFooter.classList.add( "row", "justify-content-end", "text-center" );
  smallLiked.classList.add( "col-3", "d-flex", "justify-content-center", "align-items-center");
  spanLiked.classList.add("liked");
  //TODO !!!!
  esFavorito(inmueble.id_immoble) ? spanLiked.classList.add("fa", "fa-heart") :spanLiked.classList.add("fa", "fa-heart-o") ;
  spanLiked.setAttribute("aria-hidden", true);

if(!listado){

    divMaquetacionFooter.classList.add( "row", "justify-content-between", "text-center" ,'p-3');

    /*BODY*/
    divCardBody.appendChild(h5CardTitle); 
    divCardBody.appendChild(pCardText);
    divCardBody.appendChild(pLocalizacion);
    /* FOOTER */
    // divCardfooter.appendChild(smallTextMuted);
 
    divMaquetacionFooter.appendChild(bPreu);
    //HIPOTECA
    divMaquetacionFooter.appendChild(buttonHipoteca);
  
    divCardfooter.appendChild(divMaquetacionFooter);
  
    /* DIV CARD */
    divCard.appendChild(imgCardImgTop);
    divCard.appendChild(divCardBody);
    divCard.appendChild(divCardfooter);
  
    divCardgroup.appendChild(divCard);
    card.appendChild(divCardgroup);
   // console.log(card);
    return card;
}
  /*BODY*/
  divCardBody.appendChild(h5CardTitle); 
  divCardBody.appendChild(pCardText);

  /* FOOTER */
  // divCardfooter.appendChild(smallTextMuted);
  // CORAZON
  smallLiked.appendChild(spanLiked);
  divMaquetacionFooter.appendChild(smallLiked);
  //HIPOTECA
  //divMaquetacionFooter.appendChild(buttonHipoteca);

  divCardfooter.appendChild(divMaquetacionFooter);

  /* DIV CARD */
  divCard.appendChild(imgCardImgTop);
  divCard.appendChild(divCardBody);
  divCard.appendChild(divCardfooter);

  divCardgroup.appendChild(divCard);
  card.appendChild(divCardgroup);
 // console.log(card);
  return card;
}

/**
 * @description Crea i insereix l'HTML dels immobles llistats per la base de dades.
 * @param {*} inmuebles Se li passa un array d'immobles.
 */
export async function pintarInmuebles(inmuebles) {
  //cantidad de inmuebles por row
  const INMUEBLES = 3;
  //Máximo de inmuebles por página
  const MAX = 10;

  let inmueblesContainer = document.getElementById("inmuebles-container");

  if (inmueblesContainer.children) {
    while (inmueblesContainer.firstChild) {
      inmueblesContainer.firstChild.remove();
  }
  }

  let countInmuebles = 0;
  let inmueblesMaquetados = new Array();

  await inmuebles.forEach(  (inmueble) => {
if(inmueblesMaquetados.length < MAX){
  inmueblesMaquetados.push(  crearMaquetacionInmueble(  inmueble, true));
}
     
  });


  while (inmueblesMaquetados.length > countInmuebles) {
    //console.log('countInmuebles while' + countInmuebles)
    let count = 0;
    let divCardGroupINMOBLES = document.createElement("div");
    divCardGroupINMOBLES.classList.add(
      "d-flex",
      "flex-sm-wrap",
      "flex-md-nowrap",
      "flex-wrap",
      "gap-3",
      "my-2",
      "container",
      "justify-content-center"
    );

    while (count < INMUEBLES && inmueblesMaquetados[countInmuebles]) {
      divCardGroupINMOBLES.append(inmueblesMaquetados[countInmuebles]);
      count++;
      countInmuebles++;
    }
    inmueblesContainer.appendChild(divCardGroupINMOBLES);
  }
}

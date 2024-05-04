import { getApiURL } from "./utils.js";
import { checkLog } from "./login.js";

// Tipo de usuario A - R

const url = getApiURL();

//FORMULARIO INMOBLE

let inmobles = new Array();
let meuInmobles = new Array();

//Habría que acotar la cantidad de resultados si la BBDD crece puede colapsar la app

/**
 * Hace una petición de todos los inmuebles de la BBDD
 * @param {number} pag  Número de página
 * @description Petición de todos los inmuebles disponibles
 * @returns {array} inmobles
 */
export async function getAllInmobles(pag = 1) {
  inmobles = new Array();

  if (pag === undefined) {
    console.log("No se ha pasado una página");
  }

  await fetch(url + "/immobles/?page=" + pag, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((resp) => resp.json())
    .then((data) => {
 
      localStorage.setItem('tipoDeBusqueda', 'all')
      localStorage.setItem('paginacion', JSON.stringify(data.pagination))
      let paginas = data.pagination.totalPages;
      
      data.results.forEach((element) => {
        // console.log(element)
        inmobles.push(element);
      });
    });

  //console.log(inmobles)
  return inmobles;
}

/**
 *
 *
 * @param {*} pag
 * @returns
 */

export async function getAllInmoblesInformation(pag = 1) {
  return await fetch(url + "/immobles/?page=" + pag, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("DATA...");
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

/**
 * @description Petición de toda la lista de inmuebles de un usuario
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
      console.log("getMyFavInmobles: ");
      console.log(data);
      meuInmobles = data;
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
  return meuInmobles;
}
/**
 *@description filtre d'inmobles per códi postal
 * @param {*} codiPostal
 * @param {number} pag  Número de página
 * @returns {Array} retorna un array d'inmobles
 */
export async function getInmoblesPerCodiPostal(codiPostal, pag = 1) {
  let inmuebles;
  await fetch(`${url}/immobles/codi_postal/${codiPostal}?page="` + pag, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        busquedaFail("No s'han trobat immobles amb aquest codi postal.");
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then((json) => {
      busquedaOk();
      localStorage.setItem('tipoDeBusqueda', 'codiPostal')
      localStorage.setItem('paginacion', JSON.stringify(json.pagination))
      return (inmuebles = json.results);
    })
    .catch((error) => {
      console.error("Error:", error);

      return (inmuebles = []);
    });

  return inmuebles;
}

/**
 * @description Filtre d'inmobles per població
 * @param {*} poblacio
 * @param {number} pag  Número de página
 * @returns {Array} retorna un array d'inmobles
 */
export async function getInmoblePerPoblacio(poblacio, pag = 1) {
  let inmuebles;
  await fetch(`${url}/immobles/poblacio/${poblacio}`, {
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        busquedaFail("No s'han trobat immobles en aquesta població.");
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then((json) => {
      inmuebles = json.results;
      busquedaOk();
      localStorage.setItem('tipoDeBusqueda', 'poblacio')
      localStorage.setItem('paginacion', JSON.stringify(json.pagination))
      

      return inmuebles;
    })
    .catch((error) => {
      console.error("Error:", error);

      inmuebles = [];
    });


  return inmuebles;
}

/**
 *
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
 *
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
 *
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
 *
 * @param {*} id_immoble
 */

export async function addInmobleFavorir(id_immoble) {
  await fetch(url + "/afegirImmobleFavorit", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ id_immoble }),
  })
    .then((resp) => resp.json())
    .then((json) => !json.hasOwnProperty("error"))
    .catch((error) => {
      console.error("Error al afegir un immoble", error.message);
    });
}

export async function removeInmobleFav(id_immoble) {
  return await fetch(url + "/eliminarImmobleFavorit", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_immoble }),
  })
    .then((resp) => resp.json())
    .then((json) => !json.hasOwnProperty("error"));
}

/**
 * Acyualizacion de inmueble
 *
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
 *
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

/* LISTA DE INMOBLES */
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

export async function verTodosInmuebles() {
  let inmuebles;
  const verTodosInmuebles = document.getElementById("ver-todos-inmuebles");
  verTodosInmuebles.addEventListener("click", async () => {
    inmuebles = await getAllInmobles();
    busquedaOk();
    pintarInmuebles(inmuebles);
  });
}

export async function formularioBusquedaInmuebles() {
  //console.log("DENTRO DE FORMULARIO BUSQUEDA");
  let mensaje;
  let inmuebles = new Array();
  const formularioBusquedaInmuebleElemento = document.getElementById(
    "formulario-busqueda-inmuebles"
  );

  formularioBusquedaInmuebleElemento.addEventListener(
    "submit",
    async (evento) => {
      //Limpia el input

      evento.preventDefault();

      let valorBusqueda = formularioBusquedaInmuebleElemento[0].value;
      let tipoBusqueda = formularioBusquedaInmuebleElemento[2].value;

      if (valorBusqueda == "") {
        mensaje = "Ha de seleccionar un tipus de cerca una.";
        mensajeBusquedaError(mensaje);
      }
      if (valorBusqueda == "" && tipoBusqueda == "codiPostal") {
        mensaje = "Ha d'introdui un codi postal";
        mensajeBusquedaError(mensaje);
      }

      if (valorBusqueda == "" && tipoBusqueda == "poblacio") {
        mensaje = "Ha d'introdui un poblacio";
        mensajeBusquedaError(mensaje);
      }

      if (valorBusqueda) {
        switch (tipoBusqueda) {
          case "codiPostal":
            inmuebles = await getInmoblesPerCodiPostal(valorBusqueda);
            valorBusqueda = "";
            break;
          case "poblacio":
            inmuebles = await getInmoblePerPoblacio(valorBusqueda);    
            valorBusqueda = "";
            break;
          default:
            inmuebles = await getAllInmobles();
            break;
        }

        pintarInmuebles(inmuebles);
        crearPaginacion();
      }
      evento.originalTarget[0].value = "";
    }
  );
}

/**
 * Crea y introduce el html de los inmuebles listados por la bbdd
 *
 * @param {*} inmueblesPar
 * 
 */
export async function pintarInmuebles(inmueblesPar) {
  let inmuebles = new Array();
  //cantidad de inmuebles por row
  const INMUEBLES = 3;
  let inmueblesContainer = document.getElementById("inmuebles-container");

  if (inmueblesContainer.children) {
    while (inmueblesContainer.firstChild) {
      inmueblesContainer.firstChild.remove();
    }
  }

  //console.log("inmueblesPAr")
  //console.log(inmueblesPar)


  if (inmueblesPar == undefined) {
    inmuebles = await getAllInmobles();
  } else {
    inmuebles = inmueblesPar;
  }

  let countInmuebles = 0;
  let inmueblesMaquetados = new Array();

  inmuebles.forEach((inmueble) => {
    inmueblesMaquetados.push(crearMaquetacionInmueble(inmueble));
  });

  //console.log(inmueblesMaquetados.length)
  //console.log('countInmuebles ' + countInmuebles)
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

  //cada 3 pisos mostrados crea un grupo
}

/**
 * Crea los elemento de inmueble para mostrar en la pagina inicial
 * 
 * @param {*} inmueble 
 * @returns Retorna un elemento HTML
 */
function crearMaquetacionInmueble(inmueble) {
  //crea elementos de la tarjeta

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

  divCardgroup.classList.add("card-group");

  h5CardTitle.textContent = "immoble a, " + inmueble.Poblacio;
  pCardText.textContent = inmueble.Descripcio;
  imgCardImgTop.src = inmueble.Imatge
    ? inmueble.image
    : "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE";

  divCard.classList.add("card");
  divCard.value = inmueble.id_immoble;
  imgCardImgTop.classList.add("card-img-top");
  imgCardImgTop.setAttribute("alt", inmueble.Descripcio);

  divCardBody.classList.add("card-body");
  h5CardTitle.classList.add("card-title", "text-start", "title-inmoble");
  pCardText.classList.add("card-text", "text-start", "decripcion-inmoble");
  divCardfooter.classList.add("card-footer");

  divMaquetacionFooter.classList.add(
    "row",
    "justify-content-between",
    "text-center"
  );
  smallLiked.classList.add(
    "col-3",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  spanLiked.classList.add("liked");
  spanLiked.classList.add("fa", "fa-heart-o");
  spanLiked.setAttribute("aria-hidden", true);

  buttonHipoteca.textContent = "calcula hipoteca";
  buttonHipoteca.classList.add("btn", "btn-primary", "p2", "col-6");

  /*BODY*/
  divCardBody.appendChild(h5CardTitle);
  divCardBody.appendChild(pCardText);

  /* FOOTER */
  // divCardfooter.appendChild(smallTextMuted);
  // CORAZON
  smallLiked.appendChild(spanLiked);
  divMaquetacionFooter.appendChild(smallLiked);
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



function busquedaOk() {
  const busquedaMensaje = document.getElementById("busqueda-mensaje");
  busquedaMensaje.classList.add("visually-hidden");
}

/**
 * Añade un mensaje de fallo a la busqueda de inmuebles
 *
 * @param {*} mensaje
 */
function mensajeBusquedaError(mensaje) {
  const busquedaMensaje = document.getElementById("busqueda-mensaje");
  busquedaMensaje.classList.remove("visually-hidden");
  busquedaMensaje.firstChild.nextSibling.textContent = mensaje;
}

//CONTROL DE USUARIO
export function controlLogin() {
  checkLog();
}

/******************/
/* LIKE INMOBLE */
/******************/

/**
 * Contiene un eventListener el cual comprueba que se haga click en un corazón
 * y comprueba el estado del mismo, si tiene la clase liked es que le gusta al usuario y lo que hace es quitarle la clase y viceversa.
 *
 */
export function likeInmueble() {
  document.addEventListener("click", (elemento) => {
    let clases = elemento.target.classList;

    console.log(clases.contains("liked"));
    if (clases.contains("liked")) {
      if (checkLog()) {
        if (clases.contains("fa-heart-o")) {
          likeCorazon(clases);
          addInmobleFavorir(elemento.target.offsetParent.value);
        } else {
          dislikeCorazon(clases);
          removeInmobleFav(elemento.target.offsetParent.value);
        }
      } else {
        console.log("no esta logueado al modal...");
        modalShow();
      }
    }
  });
}

/**
 * Activa el modal de login
 */
function modalShow() {
  let modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  modal.show();
}

/**
 * Elimina la clase de corazon relleno y pone la vacia
 * Recibe como parametro una lista de clases del padre
 *
 * @param {*} clases
 */
function dislikeCorazon(clases) {
  //console.log("dislike");
  clases.remove("fa-heart");
  clases.add("fa-heart-o");
}

/**
 * Elimina la clase de corazon vacia y pone la rellena
 * Recibe como parametro una lista de clases del padre
 *
 * @param {*} clases
 */
function likeCorazon(clases) {
  //console.log("like");
  clases.remove("fa-heart-o");
  clases.add("fa-heart");
}

/*  */
//Al apretar sobre una card se abrira un modal con los datos del inmueble
//
document.addEventListener("click", (evento) => {
  console.log("Click elemento:");
  console.log(evento.target.offsetParent.classList.contains("card"));
  //

});

/******************/
/* PAGINACION */
/******************/
function activarPagina(pagina) {
  document.addEventListener("click", (evento) => {
    let paginas = evento.target.parentElement.parentElement.children.length;
    for(let i=0; i <paginas; i++){
     evento.target.parentElement.parentElement.children[i].classList.remove('active')
    }
    evento.target.parentElement.classList.add("active");
  });

}


function crearPaginacion() {
console.log('paginacion')


  let tipoBusqueda = localStorage.getItem('tipoDeBusqueda');
  
  let paginacionDatos = JSON.parse(localStorage.getItem('paginacion'));
  console.log(tipoBusqueda);
  console.log(paginacionDatos);
  console.log(paginacionDatos.totalPages);


  const pagina = document.getElementById("main-content");
  let navegacionPaginas = document.createElement("nav");
  let contenedorPaginas = document.createElement("ul");

  navegacionPaginas.setAttribute("aria-label", "...");

  contenedorPaginas.classList.add(
    "col-3",
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "pagination",
    "pagination-sm"
  );

  for (let i = 1; i < paginacionDatos.totalPages; i++) {
    let pagina = document.createElement("li");
    pagina.classList.add("page-item");
    i == 1 ? pagina.classList.add("active") : pagina.classList.remove("active") 

    let a = document.createElement("a");
    a.classList.add("py-2", "page-link");

    a.textContent = i;
    pagina.setAttribute("onClick", activarPagina(i));

    pagina.appendChild(a);
    contenedorPaginas.appendChild(pagina);
  }

  pagina.append(contenedorPaginas);

}

/*
const paginacionSeleccion =  document.getElementsByClassName('paginacion-sel');

paginacionSeleccion.addEventListener()

function listaDePaginas(){}


*/

import { getApiURL } from "./utils.js";

// Tipo de usuario A - R 

// Http only - Con cookies no utilizar el local Storage.

const token = localStorage.getItem("token");
const ruta = window.location.href;

//((()=>{console.log('dentro de peticiones inmoble')})())

//FORMULARIO INMOBLE

let inmobles = new Array();
let meuInmobles = new Array();

//Habría que acotar la cantidad de resultados si la BBDD crece puede colapsar la app

/**
 * Petición de todos los inmuebles disponibles
 * @returns
 */
export async function getAllInmobles() {
  inmobles = [];
  await fetch(getApiURL() + "/immobles", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((element) => {
        inmobles.push(element);
      });
    });
  return inmobles;
}


/**
 *Petición de toda la lista de inmuebles de un usuario
 *
 *
 * @returns
 */
export async function getMyInmobles() {
  meuInmobles = [];

  await fetch(getApiURL() + "/immobles/r", {
    credentials:'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("meus inmobles");
      // da el error
      console.log(data);
      meuInmobles = data;
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });

  return meuInmobles;
}

/**
 *filtre d'inmobles per códi postal
 *
 * @param {*} codiPostal
 * @returns {[{}]} retorna un array d'inmobles
 */
export async function getInmoblesPerCodiPostal(codiPostal) {
  inmobles = [];

  await fetch(getApiURL() + "/immobles/codi_postal/" + codiPostal, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((json) => {
      json.forEach((element) => {
        inmobles.push(element);
      });
    });

  return inmobles;
}

/**
 *Filtre d'inmobles per població
 *
 * @param {*} poblacio
 */
export async function getInmoblePerPoblacio(poblacio) {
  inmobles = [];

  await fetch(getApiURL() + "/immobles/poblacio/" + poblacio, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((json) => {
      json.forEach((element) => {
        inmobles.push(element);
      });
    });

  return inmobles;
}



/**
 *
 * @param {*} token
 * @param {*} inmoble
 */

export async function addInmoble(token, inmoble) {
  await fetch(getApiURL() + "/immobles/afegir", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inmoble),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("inmoble");
      console.log(JSON.stringify(data));

      console.log("Registro correcte de l'inmoble:", data);
      alert("Imoble registrat correctament!");
      return JSON.stringify(data);
    })
    .catch((error) => {
      console.error("Error en el registro de inmueble:", error.message);
    });
}

/**
 *
 * @param {*} id_immoble
 */
export async function removeInmoble(id_immoble) {
  return await fetch(getApiURL() + "/immobles/r/eliminar/"+id_immoble, {
    method: "DELETE",
    credentials:'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((json) => !json.hasOwnProperty('error'));
}




if (token && ruta.includes("register-inmobles")) {
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
    tdImatge.setAttribute("Imatge", "Imatge-" + inmoble.Imatge);
    tdImatge.textContent = inmoble.Imatge;

    let tdDeleteUsuari = document.createElement("td");
    let tdButton = document.createElement("button");
    let iconDelete = document.createElement("i");
    (iconDelete.classList = "fa"), "fa-close";
    iconDelete.setAttribute("aria-hidden", true);

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
    tdDeleteUsuari.append(tdButton);
    tr.appendChild(tdDeleteUsuari);

    contenidoTabla.appendChild(tr);
  });
}

//.../r/afegir
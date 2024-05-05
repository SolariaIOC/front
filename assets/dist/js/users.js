import { getApiURL } from "./utils.js";

/* MANEJO DE USUARIOS */
let regErrorMssg = "Error en registrar. Si us plau, torneu-ho a provar.";
let regConfMssg = "Registre amb èxit!";

/**
 * @description Permet fer login
 * @param {String} rutaApi
 * @param {String} email
 * @param {String} pass
 * @returns {void}
 */
export function loginUser(rutaApi, email, pass) {
  let datausuari = { Email: email, Contrasenya: pass };

  fetch(rutaApi + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datausuari),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("S'ha produït un error al servidor.");
      }
      return resp.json();
    })
    .then((data) => {
      console.log("Data Login:");
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error en el login:", error.message);
    });
}

/**
 * @description Retorna un usuario o un null
 * @returns {json} 
 * @returns {null} 
 */
export function isUserLoged(){
   let usuario =  localStorage.getItem('usuario');
   if(usuario !== undefined){
    return JSON.parse(usuario); } else {
      return null;
    }
}

/**
 * @description Diu si un usuari es administrador o no
 * @returns {boolean}
 */
export function isUserAdmin(){
  return isUserLoged().tipusUsuari === 'A';
}

/**
 * @description Obte un usuari de base de dades
 * @param {String} rutaAPI
 * @param {int} id
 * @returns usuari
 */
export function getUser(rutaAPI, id) {
  fetch(rutaAPI + "/app/" + id)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      console.log("get usuario");
      console.log(data);
      usuari = data;
    })
    .catch((error) => {
      console.error("Error al recuperar l'usuari:", error.message);
    });
}

/**
 * Retorna el objeto usuario
 * @returns {Object} usuari
 */
export function getLocalUser() {
  let usuari = JSON.parse(localStorage.getItem("usuario"));
  return usuari;
}

/**
 * @description Registra l'usuari a la base de dades
 * @param {String} rutaAPI
 * @param {Object} datausuari
 * @returns {void}
 */
export function registerUser(rutaAPI, datausuari) {
  fetch(rutaAPI + "/app/registre", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datausuari),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(
          "S'ha produït un error en registrar. Si us plau, torneu-ho a provar."
        );
      }
      return resp.json();
    })
    .then((data) => {
      console.log("registro correcto:", data);

      // EJECUTAR MODAL REGISTRO CORRECTO 5 SEG Y REDIRIGE A INDEX LOGUEADO.
      setTimeout(() => {
        renderizaFragmento("#message-modal", "components/message-modal.html");
      }, 1000);

      const missModal = new bootstrap.Modal(
        document.getElementById("message-modal")
      );
      const missatge = document.getElementById("misatje-en-modal");
      missatge.textContent = regConfMssg;
      missModal.show();

      setTimeout(location.assign("/index.html"), 3000);
    })
    .catch((error) => {
      console.error("Error en el registro:", error.message);
    });
}

/**
 * @description Retorna el llistat d'usuaris
 * @returns {Array} usuaris
 */
export async function getUsers() {
  return await fetch(getApiURL() + "/app/")
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("S'ha produït un error al servidor.");
      }
      return resp.json();
    }).then((data) => {
      return data;
    }).catch((error) => {
      console.error("Error en la peticio de usuaris:", error.message);
    });
}

/**
 * @description Elimina un usuari de la base de dades
 * @param {int} id_usuari
 * @returns {void}
 */
export async function removeUser(id_usuari) {
  return await fetch(getApiURL() + "/app/a/eliminarUsuari/" + id_usuari, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
      .then((resp) => resp.json())
      .then((json) => !json.hasOwnProperty("error"));
}

/**
 * @description Afegeix un usuari de la base de dades
 * @param {Object} user
 * @returns {void}
 */
export async function addUser(user) {
  await fetch(getApiURL() + "/app/registre", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then(async (resp) => {
    if (!resp.ok) {
      alert(await resp.text());
    } else {
      alert("Usuari registrat correctament.");
      window.location.assign("/dashboard.html#all-usuaris");
      location.reload();
    }
  }).catch((error) => {
    console.error("Error en el registro del usuario", error.message);
    alert("No s'ha pogut crear correctament l\'usuari");
  });
}

/**
 * @description Actualitza un usuari de la base de dades
 * @param {Object} user
 * @returns {void}
 */
export async function updateUser(user, id_usuari) {
  await fetch(getApiURL() + "/app/a/actualitzarUsuari/"+id_usuari, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
      .then(async (resp) => {
        if (!resp.ok) {
          alert(await resp.text());
        } else {
          alert("Usuari editat correctament.");
          window.location.assign("/dashboard.html#all-usuaris");
          location.reload();
        }
      }).catch((error) => {
        console.error("Error en la edición del usuario", error.message);
        alert("No s'ha pogut editar correctament l\'usuari");
      });
}

/**
 * @description Crea una taula amb els usuaris
 * @param {Object} usuaris
 * @returns {void}
 */
export function fillTablaUsuarios(usuaris) {
  const contenidoTabla = document.getElementById("contenido-en-tabla-usuaris");
  // let rowUsuario = document.createDocumentFragment();

  // CHECKEAR SI YA ESTA RENDERIZADO
  // NO AGRAGR EL USUARIO QUE LO ESTA CONSULTANDO

  usuaris.forEach((usuari) => {
    let tr = document.createElement("tr");
    tr.setAttribute("scope", "row");

    let thId = document.createElement("th");
    thId.setAttribute("id", "id-" + usuari.id_usuari);
    thId.textContent = usuari.id_usuari;

    let tdNom = document.createElement("td");
    tdNom.setAttribute("nom", "nom-" + usuari.Mom);
    tdNom.textContent = usuari.Nom;

    let tdEmail = document.createElement("td");
    tdEmail.setAttribute("email", "email-" + usuari.Email);
    tdEmail.textContent = usuari.Email;

    let tdTipusUsuari = document.createElement("td");

    let tdDeleteUsuari = document.createElement("td");
    let iconDelete = document.createElement("i");
    (iconDelete.classList = "fa"), "fa-close";
    iconDelete.setAttribute("aria-hidden", true);

    // AÑADIR ON CLICK CON COMPROBACIONES
    let select = document.createElement("select");
    select.setAttribute("name", "tipus-de-usuari");

    let optionUsuari = document.createElement("option");
    optionUsuari.setAttribute("id", "usuari");
    optionUsuari.value = "usuari";
    optionUsuari.textContent = "usuari";

    let optionAdmin = document.createElement("option");
    optionAdmin.setAttribute("id", "admin");
    optionAdmin.value = "admin";
    optionAdmin.textContent = "admin";

    tr.appendChild(thId);
    tr.appendChild(tdNom);
    tr.appendChild(tdEmail);

    select.appendChild(optionAdmin);
    select.appendChild(optionUsuari);
    tdTipusUsuari.appendChild(select);

    tr.appendChild(tdTipusUsuari);
    tdDeleteUsuari.append(iconDelete);
    tr.appendChild(tdDeleteUsuari);

    contenidoTabla.appendChild(tr);

    let usuariSelected = document.getElementById("usuari");
    let adminelected = document.getElementById("admin");

    usuari.tdTipusUsuari === "admin"
      ? (adminelected.selected = true)
      : (usuariSelected.selected = true);
  });
}

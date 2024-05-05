/* MANEJO DE USUARIOS */
let regErrorMssg = "Error en registrar. Si us plau, torneu-ho a provar.";
let regConfMssg = "Registre amb èxit!";

/**
 * @description Petició de login a l'endpoint
 * @param {string} rutaApi ruta de l'api
 * @param {string} email email de l'usuari
 * @param {string} pass password de l'usuari
 * @void
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
      //console.log("Data Login:");
      //console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error en el login:", error.message);
    });
}

/**
 * @description Retorna un usuari o un null segons estigui loguejat o no.
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
 * @description Ens diu si un usuari es administrador o no
 * @returns {boolean}
 */
export function isUserAdmin(){
  return isUserLoged().tipusUsuari === 'A';
}

/**
 * @description 
 * @param {String} rutaAPI
 * @param {Integer} id
 * @returns {json} usuari
 */
export function getUser(rutaAPI, id) {
  fetch(rutaAPI + "/app/" + id)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
     // console.log("get usuario");
     // console.log(data);
      usuari = data;
    })
    .catch((error) => {
      console.error("Error al recuperar l'usuari:", error.message);
    });
}

/**
 * @description Retorna l'objecte usuari
 * @returns usuari
 */
export function getLocalUser() {
  let usuari = JSON.parse(localStorage.getItem("usuario"));
  return usuari;
}

/**
 * @description Envia la petició de registre a l'endpoint.
 * @param {String} rutaAPI url del endpoint
 * @param {*} datausuari dades de l'usuari
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
      // console.log("registro correcto:", data);

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
 * @description Llista d'usuaris registrats
 * @param {string} rutaAPI
 * @returns
 */
export function getUsers(rutaAPI) {
  let usuaris = fetch(rutaAPI + "/app/")
    .then((resp) => {
      resp;
      if (!resp.ok) {
        throw new Error("S'ha produït un error al servidor.");
      }
      return resp.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error en la peticio de usuaris:", error.message);
    });

  return usuaris;
}

// TODO ELIMINAR
/**
 * @description Elimina un usuari amb token
 * @param {string} rutaAPI
 * @param {*} id
 * @param {*} token
 */
export function deleteUser(rutaAPI, id, token) {}

/* LISTA DE USUARIOS */
/**
 * @description Omple la tabla d'usuaris
 * @param {*} usuaris 
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

/* OBTENCION DE LA URL */

let url = (() => {
  if (
    window.location.hostname == "localhost" ||
    window.location.hostname == "127.0.0.1"
  ) {
    console.log("DEV");
    return "http://" + window.location.hostname + ":3333";
  } else {
    console.log("LIVE");
    return "https://" + window.location.hostname + ":3333";
  }
})();

/* PETICION BACK */

export async function peticionLogin(dataUsuari) {

  //Deslogueamos por si esta ya logueado


  fetch(url + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dataUsuari),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("S'ha produït un error al servidor.");
      }
      return resp.json();
    })
    .then((data) => {
      /* GUARDA USUARIO EN LOCAL */
      localStorage.setItem("usuario", JSON.stringify(data.datosUsuario));

      modoLogueado();

      window.location.assign("/dashboard.html");

      return data;
    })
    .catch((error) => {
      showLoginError()
      console.error("Error en el login:", error.message);
    });
}


function peticionLogout(url){
   
  
  fetch(url + "/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("S'ha produït un error al servidor.");
          }
          console.log("logout correcte.")
        })
        .catch((error) => {
          console.error("Error en el login:", error.message);
        });
    
}

/* LOGIN DE USUARIO */

export function userLogin() {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let dataUsuari = { Email: email, Contrasenya: password };

    if (!checkLog()) {
      peticionLogin(dataUsuari);
    }
  });

  loginForm.addEventListener("change", () => {
    hideLoginError()
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    checkLoginAndPassword(email, password);
  });
}

/* CHECKEAMOS SI HA RELLENADO LOS DATOS */
/**
 * @description Checkea si se ha rellenado el formulario de login
 * 
 * @param {*} loginEmail 
 * @param {*} loginPassword 
 */
function checkLoginAndPassword(loginEmail, loginPassword) {
  if (loginEmail !== "" && loginPassword !== "") {
    $("#btnLogin").removeClass("disabled");
  } else {
    $("#btnLogin").addClass("disabled");
  }
}

/* CHECKEAMOS SI EL USUARIO ESTA LOGUEADO */
function checkLog() {
  let usuario = localStorage.getItem("usuario");

  if (JSON.parse(usuario) != undefined) {
    console.log("El usuario " + JSON.parse(usuario).nombre + " está logueado");
    return true;
  } else {
    console.log("el usuario no está logueado");
    return false;
  }
}

/* CAMBIAR MODO LOGUEADO NAV */

export function modoLogueado() {
  const nomContainer = document.getElementById("nom-usuari-container");
  const btnContainer = document.getElementById("btn-login-container");

  const usuario = getUsuario();

  if (usuario) {
    // crear botones
    let botonLogout = crearBotonLogout();
    let botonUsuario = crearBotonUsuario(usuario);

    nomContainer.appendChild(botonUsuario);

    //cambio boton login pot logout
    btnContainer.replaceChildren(botonLogout);

    botonLogout.addEventListener('click', ()=>{
        logout();
    })
  }
}

/* AÑDIR NOMBRE EN EL DASHBOARD */
export function modoLogueadoDashboard(){

    console.log("MODO LOGUEADO ACTIVO")
    const nomDashboard = document.getElementById('username');
    const logoutDashboard = document.getElementById('logoutDashborad');


    let usuario = getUsuario();

    nomDashboard.textContent =usuario.nombre ;
   
    logoutDashboard.addEventListener('click', ()=>{
        console.log("CLICK LOGOUT")
       logout(url);
     
        
    })
    
}




/**
 * @description Devuelve un boton para hacer logout
 * 
 * @returns {button}logoutButton
 */
function crearBotonLogout() {
  let logoutButton = document.createElement("button");
  logoutButton.classList.add("btn", "btn-outline-primary", "m-3");
  logoutButton.id = "btn-logout";
  logoutButton.textContent = "logout";
  let logoutIcon = document.createElement("i");
  logoutIcon.classList.add(
    "fa-solid",
    "fa-arrow-right-to-bracket",
    "m-3",
    "mr-1",
    "mb-0",
    "mt-0",
    "me-0",
    "pr-5"
  );
  logoutButton.appendChild(logoutIcon);

  return logoutButton;
}


/**
 * @description  Devuelve un boton para hacer login
 * 
 * @returns {button}loginButton
 */
function crearBotonLogin() {
  let loginButton = document.createElement("button");
  loginButton.classList.add("btn", "btn-outline-primary", "m-3");
  loginButton.setAttribute("href", "#staticBackdrop");
  loginButton.setAttribute("data-bs-toggle", "modal")
  loginButton.id = "btn-login";
  loginButton.textContent = "login";
  let loginIcon = document.createElement("i");
  loginIcon.classList.add(
    "fa-solid",
    "fa-arrow-right-to-bracket",
    "m-3",
    "mr-1",
    "mb-0",
    "mt-0",
    "me-0",
    "pr-5"
  );
  loginButton.appendChild(loginIcon);

  return loginButton;
}


/**
 * @description Devuelve un boton para acceder al dashboard
 * 
 * @returns {button}btnProfile
 */
function crearBotonUsuario(usuario) {
  let btnProfile = document.createElement("button");
  btnProfile.textContent = "Benvingut, " + usuario.nombre;
  btnProfile.value = "account profile";
  btnProfile.setAttribute("id", "perfil-usuari");
  btnProfile.setAttribute("onclick", 'location.assign("/dashboard.html")');
  btnProfile.classList.add("btn", "btn-user-profile");

  let iconoUsuario = document.createElement("i");
  iconoUsuario.setAttribute("aria-hidden", true);
  iconoUsuario.classList.add(
    "fa-solid",
    "fa-user",
    "m-2",
    "me-0'",
    "mt-0",
    "mb-0",
    "pr-5"
  );

  btnProfile.appendChild(iconoUsuario);

  return btnProfile;
}

/**
 *@description Devuelve el usuario que está logueado
 * @returns {json} usuario
 */
function getUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  return usuario;
}

/*********#################################*************/
/**
 *
 * @description  Desloguea al usuario
 * 
 * @void
 */

export function logout(){

    if(window.location.pathname != "/dashboard.html"){

        
        const benvinguda = document.getElementById("perfil-usuari");
        const nomContainer = document.getElementById("nom-usuari-container");
        const btnContainer = document.getElementById("btn-login-container");


        const btnLogin = crearBotonLogin();
        btnContainer.replaceChildren(btnLogin);
        //quitar banner
        nomContainer.removeChild(benvinguda);
        localStorage.removeItem("usuario");
        peticionLogout(url);

    }




  // Elimina usuario
  localStorage.removeItem("usuario");
  peticionLogout(url);

  window.location.assign("/index.html")

}

/********###################################***********/

function showButtonSpinner() {
  $("#btnLogin").html('<i class="fas fa-spinner fa-spin"></i>');
  $("#btnLogin").addClass("disabled");
}

function removeButtonSpinner() {
  $("#btnLogin").html("Login");
  $("#btnLogin").removeClass("disabled");
}
function showLoginError() {
  $(".error-message-login").show();
  $(".error-message-login").text("Usuari i/o contrasenya incorrectes");
}

function hideLoginError() {
  $(".error-message-login").hide();
  $(".error-message-login").text("");
}

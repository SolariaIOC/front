import { getApiURL } from "./utils.js";

import {peticionLogin } from "./login.js"


const url = getApiURL();
  
document.onload = () => {
    console.log("cargado Registre.js");
}

const formularioRegistro = document.getElementById("registre-formulari-dades");
const btnRegistre = document.getElementById("btnRegistre");
const messageModal = document.getElementById("message-modal");

/**
 * @description Listener para el formulario de registro, al modificar el formulario
 * @returns {void}
 */
formularioRegistro.addEventListener('change', ()=>{

      let nom =  document.getElementById("nom").value;
      let cognoms = document.getElementById("cognoms").value;
      let email = document.getElementById("email").value;
      let contrasenya = document.getElementById("contrasenya").value;

      if(nom != "" && cognoms != "" && email != "" && contrasenya!= ""){
        btnRegistre.classList.remove("disabled");
      }else{
        btnRegistre.classList.add("disabled");
      }

})

let errorMssg = "Error en registrar. Si us plau, torneu-ho a provar.";
let confMssg = "Registre amb èxit!";
console.log("dentro de registro");

/**
 * @description Listener para el formulario de registro, al enviar el formulario
 * @returns {void}
 */
formularioRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const formData = new FormData(formularioRegistro);

    console.log(formData)

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const usuariologin = {"Email":data.Email, "Contrasenya":data.Contrasenya}

    fetch(url + "/app/registre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include"
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error(
            "S'ha produït un error en registrar. Si us plau, torneu-ho a provar."
          );
        }
    })
    .then((data) => {
    console.log("Registro correcto:", data);
      peticionLogin(usuariologin);
    })
    .catch((error) => {
    console.error("Error en el registro:", error.message);
    });
});


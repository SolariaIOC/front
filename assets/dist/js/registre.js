import { renderizaFragmento } from "./utils/modularizacionHtml.js";
import { getApiURL } from "./utils.js";




/*
  window.addEventListener("DOMContentLoaded", function() {
    console.log('cargado registro form DOMContentLoaded...');
    formularioRegistro = document.getElementById("registre-formulari-dades");
    console.log(formularioRegistro);
    
}, false);


window.onload = () => {
  console.log('cargado registro form onload...');
  formularioRegistro = document.getElementById("registre-formulari-dades");
  console.log(formularioRegistro);

}
*/



  

  const formularioRegistro = document.getElementById("registre-formulari-dades");


  let errorMssg = "Error en registrar. Si us plau, torneu-ho a provar.";
  let confMssg = "Registre amb èxit!";

  console.log("dentro de registro");
  formularioRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const formData = new FormData(this);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });


    fetch(getApiURL() + "/app/registre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "S'ha produït un error en registrar. Si us plau, torneu-ho a provar."
          );
        }
        // return response.json();
      })
      .then((data) => {
        console.log("Registro correcto:", data);

        alert("T'has registrat correctament!");

        // TODO CAMBIAR RUTA A DONDE SE DIRIGE DESPUES DE REGISTRARSE
        //Comprobar que apunta a al modal
        renderizaFragmento("#message-modal", "components/message-modal.html");

        setTimeout(()=>{
          window.location.assign("index.html")

        },1000)

      })
      .catch((error) => {
        console.error("Error en el registro:", error.message);

      });
  });

// Event listener

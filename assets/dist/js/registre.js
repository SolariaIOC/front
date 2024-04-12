import { renderizaFragmento } from "./utils/modularizacionHtml.js";
import { getApiURL } from "./utils.js";


  

  const formularioRegistro = document.getElementById("registre-formulari-dades");

  const btnRegistre = document.getElementById("btnRegistre");
  
  const messageModal = document.getElementById("message-modal");

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
  formularioRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const formData = new FormData(this);

    console.log(formData)

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
      credentials: true
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
        renderizaFragmento("#message-modal-container", "components/message-modal.html");
        messageModal.value= "REGISTRO"



      })
      .catch((error) => {
        console.error("Error en el registro:", error.message);

      });
  });

// Event listener

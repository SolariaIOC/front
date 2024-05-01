
import {
  addInmoble,
  getAllInmobles,
  getMyInmobles,
  removeInmoble,
  updateInmoble,
} from "../../../js/inmoble.js";

let immobleToEdit = undefined;
let immobles = [];

function handleURLChange() {
  if (window.location.hash.split("?")[0].split("#")[1] === "editar-immoble") {
    if (immobleToEdit !== undefined) {
      setTimeout(function(){ loadImmobleEditForm(); },200);
    } else {
      window.location.replace("dashboard.html");
    }
  }
}
window.addEventListener("hashchange", handleURLChange);

window.navigation.addEventListener("navigate", () => {
    if(immobleToEdit !== undefined && window.location.hash.split('?')[0].split('#')[1] === 'editar-immoble'){
      setTimeout(function(){ loadImmobleEditForm(); },200);
    }
});

if(immobleToEdit === undefined && window.location.hash.split('?')[0].split('#')[1] === 'editar-immoble'){
    window.location.replace('dashboard.html');
}

$(document).ready(async function () {

  await loadImmoblesTable();

  $(document).on("click", ".edit-immoble", async function () {
    for (let j = 0; j < immobles.length; j++) {
      if (immobles[j].id_immoble === parseInt($(this).attr("data-id"))) {
        immobleToEdit = immobles[j];
        window.location.hash = "editar-immoble";
        await loadImmobleEditForm();
        break;
      }
    }
  });

  $(document).on("click", ".remove-immoble", async function () {
    await removeImmobleFromTable($(this).attr("data-id"));
  });

  $(document).on("click", '.dashboard-link[href="#immobles"]', async function () {
      await loadImmoblesTable();
    }
  );
});

$(document).on("submit", "#crear-formulari-inmoble", async function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  console.log(formData);

  const inmoble = {};
  formData.forEach((value, key) => {
    if(key === 'image') {
      inmoble['Imatge'] = value.name;
    } else {
      inmoble[key] = value;
    }
  });

  $.ajax({
    url: "image_processor.php",
    type: "POST",
    data:  formData,
    cache: false,
    contentType: false,
    processData: false,
    error: function() {
      console.log("Error on process image");
    },
    success: async function(data){
      console.log(data);
      await addInmoble(inmoble);
    }
  }).done(function(response) {
    console.log(response);
  });

});

$(document).on("submit", "#editar-formulari-inmoble", async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  console.log(formData);

  const inmoble = {};
  formData.forEach((value, key) => {
    if(key === 'image') {
      inmoble['Imatge'] = value.name;
    } else {
      inmoble[key] = value;
    }
  });
  console.log(inmoble);

  if(formData.get('image').name === ""){
    inmoble['Imatge'] = formData.get('current_image_hidden');
  }

  if(formData.get('image').name === undefined){
    console.log("IS UNDEFINED");
  }

  console.log(formData.get('image').name);
  console.log(formData.get('current_image_hidden'));

  if(formData.get('image').name !== "") {
    $.ajax({
      url: "image_processor.php",
      type: "POST",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      error: function () {
        console.log("Error on process image");
      },
      success: async function (data) {
        console.log(data);
        await updateInmoble(inmoble, immobleToEdit.id_immoble);
      }
    }).done(function (response) {
      console.log(response);
    });
  } else {
    await updateInmoble(inmoble, immobleToEdit.id_immoble);
  }
});

async function removeImmobleFromTable(id) {
  let hasBeenDeleted = await removeInmoble(id);
  if (hasBeenDeleted) {
    alert("Immoble eliminat!!");
    await loadImmoblesTable();
  } else {
    alert("No s'ha pogut eliminar correctament el immoble");
  }
}

async function loadImmoblesTable() {

  immobles = await getMyInmobles();
  $("#immobles-information").empty();

  for (let i = 0; i < immobles.length; i++) {

    let classOddEven = i % 2 === 0 ? "odd" : "even";

    $("#immobles-information").append('<tr class="' + classOddEven + '">');
    $("#immobles-information").append("<td>" + immobles[i].Carrer + "</td>");
    $("#immobles-information").append("<td>" + immobles[i].Numero + "</td>");
    $("#immobles-information").append("<td>" + immobles[i].Pis + "</td>");
    $("#immobles-information").append(
        "<td>" + immobles[i].Codi_Postal + "</td>"
    );
    $("#immobles-information").append("<td>" + immobles[i].Poblacio + "</td>");
    $("#immobles-information").append("<td>" + immobles[i].Preu + "</td>");
    $("#immobles-information").append(
        '<td><span class="remove-immoble" href="#" data-id="' +
        immobles[i].id_immoble +
        '"><i class="fa-solid fa-trash"></i></span></td>'
    );
    $("#immobles-information").append(
        '<td><span class="edit-immoble dashboard-link"  href="#editar-immoble?id=' +
        immobles[i].id_immoble +
        '" data-id="' +
        immobles[i].id_immoble +'"><i class="fa-solid fa-pencil"></i></span></td>'
    );
    $("#immobles-information").append("</tr>");

  }
}

function loadImmobleEditForm() {
  $("#Carrer").val(immobleToEdit.Carrer);
  $("#Numero").val(immobleToEdit.Numero);
  $("#Pis").val(immobleToEdit.Pis);
  $("#Codi_Postal").val(immobleToEdit.Codi_Postal);
  $("#Poblacio").val(immobleToEdit.Poblacio);
  $("#Preu").val(immobleToEdit.Preu);
  $("#Descripcio").val(immobleToEdit.Descripcio);
  $("#current_image").attr('src', '/assets/uploaded/'+immobleToEdit.Imatge);
  $("#current_image_hidden").val(immobleToEdit.Imatge);
}

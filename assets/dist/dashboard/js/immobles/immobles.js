import { addInmoble, getAllInmobles, getMyInmobles, removeInmoble, updateInmoble } from "../../../js/inmoble.js";

let immobleToEdit = undefined;
let immobles = [];

function handleURLChange() {
    if (window.location.hash.split('?')[0].split('#')[1] === 'editar-immoble') {
        if (immobleToEdit !== undefined) {
            loadImmobleEditForm();
        } else {
            window.location.replace('dashboard.html');
        }
    } else {
    }
}

handleURLChange();

window.addEventListener('hashchange', handleURLChange);
loadImmoblesTable();





/*
window.navigation.addEventListener("navigate", async () => {
    await loadImmoblesTable();
    if(immobleToEdit !== undefined && window.location.hash.split('?')[0].split('#')[1] === 'editar-immoble'){
        loadImmobleEditForm();
    }
});

await loadImmoblesTable();
if(immobleToEdit === undefined && window.location.hash.split('?')[0].split('#')[1] === 'editar-immoble'){
    window.location.replace('dashboard.html');
}
*/
$(document).ready(function () {

    $(document).on("click", '.edit-immoble', function () {
        for (let j = 0; j < immobles.length; i++) {
            if (immobles[j].id_immoble === parseInt($(this).attr('data-id'))) {
                immobleToEdit = immobles[j];
                window.location.hash = 'editar-immoble';
                loadImmobleEditForm();
                break;
            }
        }
    });

    $(document).on("click", '.remove-immoble', function () {
        removeImmobleFromTable($(this).attr('data-id'));
    });

    $(document).on("click", '.dashboard-link[href="#immobles"]', function (event) {
        loadImmoblesTable();
    });
});

$(document).on("submit", '#crear-formulari-inmoble', async function (event) {

    event.preventDefault();

    const formData = new FormData(this);
    console.log(formData);

    const inmoble = {};
    formData.forEach((value, key) => {
        inmoble[key] = value;
    });

    console.log(inmoble);
    let hasBeenCreated = await addInmoble(inmoble);

    if (hasBeenCreated) {
        alert('Immoble creat correctament!');
        window.location.hash = 'immobles';
    } else {
        alert('No s\'ha pogut crear correctament el immoble');
    }
});

$(document).on("submit", '#editar-formulari-inmoble', async function (event) {

    event.preventDefault();

    const formData = new FormData(this);
    console.log(formData);

    const inmoble = {};
    formData.forEach((value, key) => {
        inmoble[key] = value;
    });

    console.log(inmoble);
    let hasBeenSavedd = await updateInmoble(inmoble);

    if (hasBeenSavedd) {
        alert('Immoble guardat correctament!');
        window.location.hash = 'immobles';
    } else {
        alert('No s\'ha pogut guardar correctament el immoble');
    }
});

async function removeImmobleFromTable(id) {
    let hasBeenDeleted = await removeInmoble(id);
    if (hasBeenDeleted) {
        alert('Immoble eliminat!!');
        await loadImmoblesTable();
    } else {
        alert('No s\'ha pogut eliminar correctament el immoble');
    }
}

async function loadImmoblesTable() {

    immobles = await getMyInmobles();
    $('#immobles-information').empty();

    for (let i = 0; i < immobles.length; i++) {

        let classOddEven;
        if (i % 2 === 0) {
            classOddEven = 'odd';
        } else {
            classOddEven = 'even';
        }

        $('#immobles-information').append('<tr class="' + classOddEven + '">');
        $('#immobles-information').append('<td>' + immobles[i].Carrer + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Numero + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Pis + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Codi_Postal + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Poblacio + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Preu + '</td>');
        $('#immobles-information').append('<td><span class="remove-immoble" href="#" data-id="' + immobles[i].id_immoble + '"><i class="fa-solid fa-trash"></i></span></td>');
        $('#immobles-information').append('<td><span class="edit-immoble dashboard-link"  href="#editar-immoble?id=' + immobles[i].id_immoble + '" data-id="' + immobles[i].id_immoble + '"><i class="fa-solid fa-pencil"></i></span></td>');
        $('#immobles-information').append('</tr>');
    }
}

function loadImmobleEditForm() {
    $('#Carrer').val(immobleToEdit.Carrer);
    $('#Numero').val(immobleToEdit.Numero);
    $('#Pis').val(immobleToEdit.Pis);
    $('#Codi_Postal').val(immobleToEdit.Codi_Postal);
    $('#Poblacio').val(immobleToEdit.Poblacio);
    $('#Preu').val(immobleToEdit.Preu);
    $('#Descripcio').val(immobleToEdit.Descripcio);
    $('#Imatge').val(immobleToEdit.Imatge);
}





/* CREAR INMOBLES HTML */

/*
  <div class="card-group">
    <div class="card">
      <img src="https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE"
        class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-start title-inmoble">Card title</h5>
        <p class="card-text text-start decripcion-inmoble">This is a wider card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.</p> </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
        <small class="liked"><span><i class="fa fa-heart" aria-hidden="true"></i></span></small>
    
      </div>
    </div>
  </div>
*/

//TODO PEDIR TODOS LOS INMUEBLES
//TODO PINTAR TODOS LOS INMUEBLES
//TODO CARGA LAZY
//TODO GESTION DE LIKES
//Likes counter?

//BusquedaInmuebles

function mostrarInmueble(inmueble){

    let cardContainer = document.createElement('card-conatiner')
    
    let divCardgroup = document.createElement('div');
        let divCard = document.createElement('div');
            let imgCardImgTop = document.createElement('img');
        let divCardBody = document.createElement('div');
            let h5CardTitle = document.createElement('h5');
            let pCardText = document.createElement('p');
        let divCardfooter = document.createElement('div');
            let smallTextMuted = document.createElement('small');
            let smallLiked = document.createElement('small');
            let spanLiked = document.createElement('small');


h5CardTitle.textContent = "immoble a, " + inmueble.Poblacio;
pCardText.textContent = inmueble.Descripcio;
imgCardImgTop.src = inmueble.Imatge ? inmueble.image : "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE";


divCardgroup.classList = "card-group";
divCard.classList ="card"
imgCardImgTop.classList ="card-img-top";
imgCardImgTop.setAttribute("alt", inmueble.Descripcio);

divCardBody.classList = "card-body";
h5CardTitle.classList = "card-title text-start title-inmoble"
pCardText.classList = "card-text text-start decripcion-inmoble"
divCardfooter.classList = "card-footer"
smallLiked.classList = "liked";
spanLiked.classList = "fa fa-heart";
spanLiked.setAttribute( "aria-hidden", true);




divCard.appendChild(imgCardImgTop)

            /*BODY*/
divCardBody.appendChild(h5CardTitle);
divCardBody.appendChild(pCardText);

            /* FOOTER */
 divCardfooter.appendChild(smallTextMuted);
 // CORAZON
 smallLiked.appendChild(spanLiked);
 divCardfooter.appendChild(smallLiked);

 









    divCardgroup.appendChild(divCard)

    cardContainer.appendChild(divCardgroup)



    

}
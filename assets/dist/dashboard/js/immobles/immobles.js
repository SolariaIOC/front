import { addInmoble, getAllInmobles, removeInmoble } from "../../../js/inmoble.js";

let immobleToEdit = undefined;
let immobles = [];

window.navigation.addEventListener("navigate", async () => {
    await loadImmoblesTable();
})

await loadImmoblesTable();

document.addEventListener("DOMContentLoaded", function(arg) {
    let editElements = document.getElementsByClassName("edit-immoble");
    for(let i = 0; i < editElements.length; i++) {
        editElements[i].onclick = function () {
            for (let j = 0; j < immobles.length; i++) {
                if(immobles[j].id_immoble === parseInt(editElements[i].getAttribute('data-id'))){
                    immobleToEdit = immobles[i];
                    console.log(immobleToEdit);
                    break;
                }
            }

        }
    }

    let removeElements = document.getElementsByClassName("remove-immoble");
    for(let i = 0; i < removeElements.length; i++) {
        removeElements[i].onclick = function () {
            removeImmobleFromTable(removeElements[i].getAttribute('data-id'));
        }
    }
});

$(document).on("submit", '#crear-formulari-inmoble', async function(event) {

    event.preventDefault();

    const formData = new FormData(this);
    console.log(formData);

    const inmoble = {};
    formData.forEach((value, key) => {
        inmoble[key] = value;
    });

    console.log(inmoble);
    let hasBeenCreated = await addInmoble(inmoble);

    if(hasBeenCreated) {
        alert('Immoble creat correctament!');
    } else {
        alert('No s\'ha pogut crear correctament el immoble');
    }
});

async function removeImmobleFromTable(id){
    let hasBeenDeleted = await removeInmoble(id);
    if(hasBeenDeleted) {
        alert('Immoble eliminat!!');
        await loadImmoblesTable();
    } else {
        alert('No s\'ha pogut eliminar correctament el immoble');
    }
}

async function loadImmoblesTable() {

    immobles = await getAllInmobles();
    $('#immobles-information').empty();

    for (let i = 0; i < immobles.length; i++) {
        $('#immobles-information').append('<tr>');
        $('#immobles-information').append('<td>' + immobles[i].id_immoble + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Carrer + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Numero + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Pis + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Codi_Postal + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Poblacio + '</td>');
        $('#immobles-information').append('<td>' + immobles[i].Preu + '</td>');
        $('#immobles-information').append('<td><a class="remove-immoble" href="#" data-id="'+immobles[i].id_immoble+'">Eliminar</a></td>');
        $('#immobles-information').append('<td><a class="edit-immoble dashboard-link" href="#editar-immoble?id=' + immobles[i].id_immoble + '" data-id="'+immobles[i].id_immoble+'">Editar</a></td>');
        $('#immobles-information').append('</tr>');
    }
}

async function loadImmobleEditForm(){

}

async function createImmoble(){

}

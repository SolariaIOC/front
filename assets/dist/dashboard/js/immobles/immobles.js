import { addInmoble, getAllInmobles, removeInmoble, updateInmoble } from "../../../js/inmoble.js";

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

    immobles = await getAllInmobles();
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
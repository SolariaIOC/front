
import {
    getAllInmoblesInformation,
    addInmobleAdmin,
    removeImmobleAdmin,
    updateInmobleAdmin,
} from "../../../js/inmoble.js";

import { isUserAdmin } from "../../../js/users.js";

if(isUserAdmin()) {

    console.log('Admin code');

    let immobleToEdit = undefined;
    let immobles = [];
    let currentPage = 1;
    let totalPages = 1;

    function handleURLChange() {
        if (window.location.hash.split("?")[0].split("#")[1] === "editar-immoble") {
            if (immobleToEdit !== undefined) {
                setTimeout(function () {
                    loadImmobleEditForm();
                }, 200);
            } else {
                window.location.replace("dashboard.html");
            }
        }
    }

    window.addEventListener("hashchange", handleURLChange);

    window.navigation.addEventListener("navigate", () => {
        if (immobleToEdit !== undefined && window.location.hash.split('?')[0].split('#')[1] === 'editar-immoble') {
            setTimeout(function () {
                loadImmobleEditForm();
            }, 200);
        }
    });

    if (immobleToEdit === undefined && window.location.hash.split('?')[0].split('#')[1] === 'editar-immoble') {
        window.location.replace('dashboard.html');
    }

    $(document).ready(async function () {

        await loadImmoblesTable();

        $(document).on("click", ".edit-immoble", async function () {
            for (let j = 0; j < immobles.length; j++) {
                if (immobles[j].id_immoble === parseInt($(this).attr("data-immoble-id"))) {
                    immobleToEdit = immobles[j];
                    window.location.hash = "editar-immoble";
                    await loadImmobleEditForm();
                    break;
                }
            }
        });

        $(document).on("click", ".previous", async function () {
            if(currentPage !== 1 ){
                currentPage--;
                await loadImmoblesTable();
            }
        });

        $(document).on("click", ".next", async function () {
            if(currentPage !== totalPages ){
                currentPage++;
                await loadImmoblesTable();
            }
        });

        $(document).on("click", ".direct", async function () {
            console.log($(this).attr("data-page"));
            currentPage = $(this).attr("data-page");
            await loadImmoblesTable();
        });

        $(document).on("click", ".remove-immoble", async function () {
            await removeImmobleFromTable($(this).attr("data-immoble-id"), $(this).attr("data-user-id"));
        });

        $(document).on("click", '.dashboard-link[href="#all-immobles"]', async function () {
                currentPage = 1;
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
            if (key === 'image') {
                inmoble['Imatge'] = value.name;
            } else {
                inmoble[key] = value;
            }
        });

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
                await addInmobleAdmin(inmoble);
            }
        }).done(function (response) {
            console.log(response);
        });

    });

    $(document).on("submit", "#editar-formulari-inmoble", async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        console.log(formData);

        const inmoble = {};
        formData.forEach((value, key) => {
            if (key === 'image') {
                inmoble['Imatge'] = value.name;
            } else {
                inmoble[key] = value;
            }
        });
        console.log(inmoble);

        if (formData.get('image').name === "") {
            inmoble['Imatge'] = formData.get('current_image_hidden');
        }

        if (formData.get('image').name === undefined) {
            console.log("IS UNDEFINED");
        }

        console.log(formData.get('image').name);
        console.log(formData.get('current_image_hidden'));

        if (formData.get('image').name !== "") {
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
                    await updateInmobleAdmin(inmoble, immobleToEdit.id_immoble); // TODO: Add user id
                }
            }).done(function (response) {
                console.log(response);
            });
        } else {
            await updateInmobleAdmin(inmoble, immobleToEdit.id_immoble); // TODO: Add user id
        }
    });

    async function removeImmobleFromTable(id, id_user) {
        let hasBeenDeleted = await removeImmobleAdmin(id, id_user);
        if (hasBeenDeleted) {
            alert("Immoble eliminat!!");
            await loadImmoblesTable();
        } else {
            alert("No s'ha pogut eliminar correctament el immoble");
        }
    }


    async function loadImmoblesTable() {

        let immoblesInformation = await getAllInmoblesInformation(currentPage);

        immobles = immoblesInformation.results;
        totalPages = immoblesInformation.pagination.totalPages;
        currentPage = immoblesInformation.pagination.currentPage;

        $("#immobles-information").empty();

        for (let i = 0; i < immobles.length; i++) {
            let classOddEven = i % 2 === 0 ? "odd" : "even";
            $("#immobles-information").append('<tr class="' + classOddEven + '">');
            $("#immobles-information").append("<td>" + immobles[i].Carrer + "</td>");
            $("#immobles-information").append("<td>" + immobles[i].Numero + "</td>");
            $("#immobles-information").append("<td>" + immobles[i].Pis + "</td>");
            $("#immobles-information").append("<td>" + immobles[i].Codi_Postal + "</td>");
            $("#immobles-information").append("<td>" + immobles[i].Poblacio + "</td>");
            $("#immobles-information").append("<td>" + immobles[i].Preu + "</td>");
            $("#immobles-information").append("<td><span class='remove-immoble' href='#' data-immoble-id='" + immobles[i].id_immoble + "' data-user-id='" + immobles[i].id_usuari + "'><i class='fa-solid fa-trash'></i></span></td>");
            $("#immobles-information").append("<td><span class='edit-immoble dashboard-link' href='#editar-immoble?id=" + immobles[i].id_immoble + "' data-immoble-id='" + immobles[i].id_immoble + "' data-user-id='" + immobles[i].id_usuari + "'> <i class='fa-solid fa-pencil'></i></span></td>");
            $("#immobles-information").append("</tr>");
        }

        $("#pages").empty();
        $("#pages").append('<li class="page-item previous"><a class="page-link" href="#">Previous</a></li>');
        for (let i = 1; i <= totalPages; i++) {
            let extraClass = i === currentPage ? 'active' : '';
            $("#pages").append('<li class="page-item direct '+extraClass+'" data-page="'+i+'"><a class="page-link" href="#">'+i+'</a></li>');
        }
        $("#pages").append('<li class="page-item next"><a class="page-link" href="#">Next</a></li>');
    }

    function loadImmobleEditForm() {
        $("#Carrer").val(immobleToEdit.Carrer);
        $("#Numero").val(immobleToEdit.Numero);
        $("#Pis").val(immobleToEdit.Pis);
        $("#Codi_Postal").val(immobleToEdit.Codi_Postal);
        $("#Poblacio").val(immobleToEdit.Poblacio);
        $("#Preu").val(immobleToEdit.Preu);
        $("#Descripcio").val(immobleToEdit.Descripcio);
        $("#current_image").attr('src', '/assets/uploaded/' + immobleToEdit.Imatge);
        $("#current_image_hidden").val(immobleToEdit.Imatge);
        $("#id_usuari").val(immobleToEdit.id_usuari);
    }
}

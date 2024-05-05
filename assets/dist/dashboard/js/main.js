import { renderizaFragmento } from "../../js/utils/modularizacionHtml.js";
import { isUserLoged, isUserAdmin } from "../../js/users.js";
import {logout} from "../../js/login.js";

let userInformation = isUserLoged();

console.log('userInformation');
console.log(userInformation);

if(userInformation === undefined || userInformation === null){
    window.location.replace("index.html");
}

// Renders
if(isUserAdmin()) {
    await renderizaFragmento("#sidebar", "../../components/dashboard/dashboard_layout/admin_menu.html");
} else {
    await renderizaFragmento("#sidebar", "../../components/dashboard/dashboard_layout/registered_menu.html");
}
await renderizaFragmento("#top-bar", "../../components/dashboard/dashboard_layout/top_bar.html");
await renderizaFragmento("#footer", "../../components/dashboard/dashboard_layout/footer.html");

// Gets the url and render the content of this url
await renderizaFragmento("#page-content", "../../components/dashboard/"+getHtmlFromUrl(window.location.hash));

$(document).ready(function() {
    $(document).on("click", '.dashboard-link', async function(event) {
        await renderizaFragmento("#page-content", "../../components/dashboard/"+getHtmlFromUrl($(this).attr('href')));
    });

    $('#username').html(userInformation.nom);
    console.log('Welcome '+userInformation.nom+'!');

    setTimeout(async function () {
        $('#username').html(userInformation.nom);
        console.log('Welcome '+userInformation.nom+'!');
    }, 500);

    $(document).on("click", '#logoutDashboard', async function(event) {
        await logout();
    });
});

function getHtmlFromUrl(url){
    let urlPath = url.split('?')[0].split('#')[1];
    console.log('urlPath: '+urlPath);

    if(isUserAdmin()) {
        console.log('Admin url');
        switch (urlPath) {
            case 'all-usuaris':
                return 'usuaris/llistat_usuaris.html';
            case 'afegir-usuari':
                return 'usuaris/crear_usuari.html';
            case 'editar-usuari':
                return 'usuaris/editar_usuari.html';
            case 'editar-immoble':
                return 'admin_immobles/editar_immoble.html';
            case 'afegir-immoble':
                return 'admin_immobles/crear_immoble.html';
            case 'all-immobles':
            default:
                return 'admin_immobles/llistat_immobles.html';
        }
    } else {
        console.log('Registered url');
        switch (urlPath) {
            case 'editar-immoble':
                return 'immobles/editar_immoble.html';
            case 'crear-immoble':
                return 'immobles/crear_immoble.html';
            case 'immobles-favorits':
                return 'immobles/immobles_favorits.html';
            case 'immobles':
            default:
                return 'immobles/llistat_immobles.html';
        }
    }
}


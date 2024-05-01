import { renderizaFragmento } from "../../js/utils/modularizacionHtml.js";
import { isUserLoged } from "../../js/users.js";

let userInformation = isUserLoged();

console.log('userInformation');
console.log(userInformation);

if(userInformation === undefined || userInformation === null){
    window.location.replace("index.html");
}

// Renders
await renderizaFragmento("#sidebar", "../../components/dashboard/dashboard_layout/menu.html");
await renderizaFragmento("#top-bar", "../../components/dashboard/dashboard_layout/top_bar.html");
await renderizaFragmento("#footer", "../../components/dashboard/dashboard_layout/footer.html");

// Gets the url and render the content of this url
await renderizaFragmento("#page-content", "../../components/dashboard/"+getHtmlFromUrl(window.location.hash));


$(document).ready(function() {
    $(document).on("click", '.dashboard-link', async function(event) {
        await renderizaFragmento("#page-content", "../../components/dashboard/"+getHtmlFromUrl($(this).attr('href')));
    });

    $('#username').html(userInformation.nombre);
    console.log('Welcome '+userInformation.nombre+'!');
});

function getHtmlFromUrl(url){
    let urlPath = url.split('?')[0].split('#')[1];
    console.log('urlPath: '+urlPath);
    switch (urlPath) {
        case 'usuaris':
            return 'usuaris/llistat_usuaris.html';
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


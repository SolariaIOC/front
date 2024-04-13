import { renderizaFragmento } from "../../js/utils/modularizacionHtml.js";

// Check if user is logged
/*
if(!isUserLogged()){
    window.location.replace("login.html");
}
 */

// Renders
renderizaFragmento("#sidebar", "../../components/dashboard/dashboard_layout/menu.html");
renderizaFragmento("#top-bar", "../../components/dashboard/dashboard_layout/top_bar.html");
renderizaFragmento("#footer", "../../components/dashboard/dashboard_layout/footer.html");

// Gets the url and render the content of this url
renderizaFragmento("#page-content", "../../components/dashboard/"+getHtmlFromUrl(window.location.hash));
$(document).ready(function() {
    $(document).on("click", '.dashboard-link', function(event) {
        renderizaFragmento("#page-content", "../../components/dashboard/"+getHtmlFromUrl($(this).attr('href')));
    });

    // TODO: Get current user
    // $('#username').html('Dani Roman');
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
        case 'immobles':
        default:
            return 'immobles/llistat_immobles.html';
    }
}


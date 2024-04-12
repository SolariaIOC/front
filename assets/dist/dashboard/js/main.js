import { renderizaFragmento } from "../../js/utils/modularizacionHtml.js";

// Renders
renderizaFragmento("#sidebar", "../../components/dashboard/dashboard_layout/menu.html");
renderizaFragmento("#top-bar", "../../components/dashboard/dashboard_layout/top_bar.html");
renderizaFragmento("#footer", "../../components/dashboard/dashboard_layout/footer.html");

// Gets the url and render the content of this url
renderizaFragmento("#page-content", "../../components/dashboard/"+getHtmlFromUrl(window.location.hash));

window.onload = function() {
    let elements = document.getElementsByClassName("dashboard-link");
    for(let i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
            // Renders the content from the link
            renderizaFragmento("#page-content", "../../components/dashboard/"+getHtmlFromUrl(elements[i].href));
        }
    }
};

function getHtmlFromUrl(url){
    let urlPath = url.split('?')[0].split('#')[1];
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


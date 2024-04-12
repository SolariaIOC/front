import { renderizaFragmento } from "../../js/utils/modularizacionHtml.js";

// Renders
renderizaFragmento("#sidebar", "../../components/dashboard/dashboard_menu.html");
renderizaFragmento("#top-bar", "../../components/dashboard/dashboard_top_bar.html");
renderizaFragmento("#footer", "../../components/dashboard/dashboard_footer.html");

// TODO: Make it dynamic
renderizaFragmento("#page-content", "../../components/dashboard/dashboard_llistat_immobles.html");
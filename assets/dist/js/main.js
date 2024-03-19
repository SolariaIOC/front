import { renderizaFragmento } from "./utils/modularizacionHtml.js";

renderizaFragmento("#barraDeNavegacion","./components/nav.html");
renderizaFragmento("#footer","./components/footer.html");


renderizaFragmento("#inmobles","./components/inmobles.html");
renderizaFragmento("#promo","./components/promo.html");
renderizaFragmento("#loginModal","./components/login-modal-html");



const token = true

if(token){
     renderizaFragmento("#banner","./components/banner.html");
}





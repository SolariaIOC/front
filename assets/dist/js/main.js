import { renderizaFragmento } from "./utils/modularizacionHtml.js";
import { renderComponent } from "./utils/components.js";
import { decodificaJWT } from "./utils/token.js";
import { hideNav } from "./utils/hideNav.js";

renderizaFragmento("#barraDeNavegacion","./components/nav.html");
renderizaFragmento("#footer","./components/footer.html");


renderizaFragmento("#inmobles","./components/inmobles.html");
renderizaFragmento("#promo","./components/promo.html");
renderizaFragmento("#loginModal","./components/login-modal.html");








hideNav()


renderComponent("#banner", "/components/banner.html")

let token = getCookie("token");
let usuario = decodificaJWT(token); 



if(token){
     renderizaFragmento("#banner","./components/banner.html");
}





console.log( decodificaJWT(token) )



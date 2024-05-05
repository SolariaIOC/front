/**
 * Retorna la URL de l'aplicació
 * @returns {string} La url de l'aplicació
 */
export function getApiURL(){
    if (window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1" ) {
        console.log('DEV');
        return "http://"+window.location.hostname+":3333";
    } else {
        console.log('LIVE');
        return "https://"+window.location.hostname+":3333";
    }
}
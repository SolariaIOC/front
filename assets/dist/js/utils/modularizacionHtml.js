
/**
 * 
 * @param {*} destinoInyeccion  Donde queremos insertar el snippet 
 * @param {*} rutaHtml El snippet en si que es un codigo html en un archivo pasar la ruta del snippet ej "/aviso"
 */
export async function renderizaFragmento(destinoInyeccion, rutaHtml) {
    const inyectarHTML = document.querySelector(destinoInyeccion);

    fetch(rutaHtml)
        .then(resp => resp.text())
        .then(data => {
            inyectarHTML.innerHTML = data;

            // Convierte texto en elementos html
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Busca y ejecuta los scripts si existen
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                const nuevoScript = document.createElement('script');
                nuevoScript.textContent = script.textContent;
                document.body.appendChild(nuevoScript);
            });
        })
        .catch(error => console.error("Error en el renderizado", error));
}

// TODO  MENSAJE DEL MODAL DINÁMICO
/*
export function renderizaModal(destinoInyeccion, rutaHtml, message) {
    const inyectarHTML = document.querySelector(destinoInyeccion);

    
   

    fetch(rutaHtml)
        .then(resp => resp.text())
        .then(data => {
            inyectarHTML.innerHTML = data;

            // Convierte texto en elementos html
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Busca y ejecuta los scripts si existen
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                const nuevoScript = document.createElement('script');
                nuevoScript.textContent = script.textContent;
                document.body.appendChild(nuevoScript);
               
            });
        })
        .catch(error => console.error("Error en el renderizado", error));
}
*/
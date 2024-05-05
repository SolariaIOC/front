
/**
 * @description Permite inyectar codigo html en diferentes partes de la aplicaicón
 * @param {String} destinoInyeccion  Donde queremos insertar el snippet
 * @param {String} rutaHtml El snippet en si que es un codigo html en un archivo pasar la ruta del snippet ej "/aviso"
 * @returns {void}
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
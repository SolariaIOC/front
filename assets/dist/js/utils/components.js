/**
 * 
 * 
 * @param {*} target  Donde queremos insertar el snippet 
 * @param {*} snippet El snippet en si que es un codigo html en un archivo pasar la ruta del snippet ej "/aviso"
 */


export function renderComponent(target, snippet){
    console.log(target)


    const aux = document.querySelector(target);

    console.log(aux)
    fetch(snippet)
        .then(resp=>resp.text())
        .then(data => data ? aux.innerHTML = data : aux.innerHTML = "")
        .catch(e => console.log(  "No se ha podido renderizar el componente" + e ))
        .finally(aux.innerHTML = "")

}


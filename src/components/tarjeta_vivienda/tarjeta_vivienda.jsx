export function TarjetaVivienda({nombre = 'unknown', descripcion ='sin descripción', url = 'x', usuario = ' unknown'}){

    return (
        <article>
            <img src={url} alt={descripcion}></img>
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
            <p>{usuario}</p>
        </article>
       
    );
}

// export default Tarjetavivienda;
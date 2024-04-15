function valor(etiqueta, valor) {
    return `
    <div>
        <span class="etiqueta">${etiqueta}:</span> ${valor}
    </div>
    `
}

function persona({ apellido, nombre, telefono }) {
    return `
    <div class="persona">
        ${valor("Apellido", apellido)}
        ${valor("Nombre", nombre)}
        ${valor("Teléfono", telefono)}
    </div>
    `
}

function generarListado(personas) {
    let s = document.getElementById("lista")
    s.innerHTML = personas.map(persona).join('')
}

function filtrarPersonas(personas, busqueda) {
    return personas.filter(persona => 
        persona.nombre.toLowerCase().includes(busqueda) || 
        persona.apellido.toLowerCase().includes(busqueda)
    );
}
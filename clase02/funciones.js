function valor(etiqueta, valor) {
    return `
    <div>
        <span class="etiqueta">${etiqueta}:</span> ${valor}</b>
    </div>
    `
}

function persona(p) {
    return `
    <div class="persona">
        ${valor("Apellido", p.apellido)}
        ${valor("Nombre", p.nombre)}
    </div>
    `
}

function generarListado(personas) {
    let s = document.getElementById("lista")
    s.innerHTML = personas.map(persona).join('')
}

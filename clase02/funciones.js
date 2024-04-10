function hijo(i) {
    return `<p>Hijo ${i}</>`
}

function valor(etiqueta, valor) {
    return `<div class="etiqueta">${etiqueta}: <b>${valor}</b></<div>`
}

function persona(p) {
    return valor("Apellido", p.persona) + valor("Nombre", p.nombre)
}

function saludar() {
    let s = document.getElementById("saludo")
    
    let nombres = [
        {
            nombre: "JUna", apellido: "PErez"
        },
        {
            nombre: "Maria", apellido: "Diaz"
        },
        {
            nombre: "Jose", apellido: "Diaz"
        },
        {
            nombre: "Maria", apellido: "Luz"
        }
    ]
    s.innerHTML = nombres.map(persona).join()
}

console.log("Hola Mundo")
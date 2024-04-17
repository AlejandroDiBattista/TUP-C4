let nombre = "Juan"
let apellido = "Perez"
let edad = 30

function nombreCompleto(nombre, apellido) {
    return `${nombre} ${apellido}`
}

let persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30
}

persona.apellido 
persona.nombre      // Sintexis
numeros[1]
persona.edad = 99


function nombreCompleto(persona) {
    return `${persona.nombre} ${persona.apellido}`
}

persona = {
    "nombre": "Juan",
    "apellido": "Perez",
    "edad": 30
}

persona["nombre"] = "Maria"
persona.nombre = "Maria"


let punto = { x: 10, y: 20 }

let { x: x1, y: y1 } = punto 
// let x1 = punto.x
// let y1 = punto.y

function nombreCompleto(persona) {
    let nombre = persona.nombre
    let apellido = persona.apellido
    return `${nombre} ${apellido}`
}

function nombreCompleto(persona) {
    let { nombre, apellido } = persona
    return `${nombre} ${apellido}`
}

function nombreCompleto({ nombre, apellido }) {
    return `${nombre} ${apellido}`
}

nombreCompleto(persona)


let p = persona 
p.nombre = "Oscar"
persona //> 
p = { ...persona }
let n = [...numeros]
punto = { x: 10, y: 20 }

let p3 = { x: 10, y: 20 }
n = [10, 20]
m = [100, ...n] 
json //

productos = [
    { "id": 1, "nombre": "Coca", "precio": 10 },
    { "id": 2, "nombre": "Pepsi", "precio": 10 },
    
]
productos[1].nombre = "Secco"
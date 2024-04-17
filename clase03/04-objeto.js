/// Objetos (Coleccion de propiedades o atributos) | Diccionarios | Hash | Map


// Tres variables relacionas 
let nombre = "Juan"
let apellido = "Perez"
let edad = 30

// Funcion que paso la variable en forma individual
function nombreCompleto(nombre, apellido) {
    return `${nombre} ${apellido}`
}

// Se puede agrupar en un objeto
let persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30
}

// Acceder a las propiedades del objeto
persona.apellido    //> "Perez"
persona.nombre      //> "Juan"

// Modificar una propiedad
persona.edad = 99

// Recibo un objeto como parametro
function nombreCompleto1(persona) {
    return `${persona.nombre} ${persona.apellido}`
}

// En realidad las "claves" del objeto son cadenas de texto
persona = {
    "nombre": "Juan",
    "apellido": "Perez",
    "edad": 30
}

// Se puede acceder a las propiedades con corchetes
persona["nombre"] = "Maria"
persona.nombre = "Maria"        // Equivalente a la linea anterior

// Forma abreviada... cuando es un identificador se puede omitir las ""
persona.sexo = "M"        // Agregar una propiedad implicitamente

"nombre" in persona       //> true | Consultar si la propiedad "nombre" esta en el objeto
delete persona.edad       // Eliminar la propiedad "edad"
persona                   //> { "nombre": "Maria", "apellido": "Perez", "sexo": "M" }



let punto = { x: 10, y: 20 }

// Desestructuracion de objetos
let { x: x1, y: y1 } = punto 
// let x1 = punto.x
// let y1 = punto.y

function nombreCompleto2(persona) { // Paso objeto como parametro lo guardo en una variable
    let nombre = persona.nombre
    let apellido = persona.apellido
    return `${nombre} ${apellido}`
}

function nombreCompleto3(persona) { // Paso objeto como parametro y desestructuro
    let { nombre, apellido } = persona
    return `${nombre} ${apellido}`
}

// lease nombreCompleto recibe un objeto con dos propiedades: nombre y apellido
function nombreCompleto4({ nombre, apellido }) {    // Desestructuro directamente en los parametros
    return `${nombre} ${apellido}`
}

// Todos esta formas son equivalentes
nombreCompleto1(persona)
nombreCompleto2(persona)
nombreCompleto3(persona)
nombreCompleto4(persona)

let otra = persona 
otra.nombre = "Oscar"
persona         //> { "nombre": "Oscar", "apellido": "Perez", "sexo": "M" }

// Al modificar 'otra' tambien se modifica 'persona' porque son el mismo objeto
// Se copia la referencia al objeto (no los valores)


// Copiar (Clonar) un objeto
otra = { ...persona }

// Clonar un objeto con Object.assign
otra = Object.assign({}, persona)

// Copiar un objeto con el operador spread
let n = [...numeros]

punto = { x: 10, y: 20 }
let p3 = { x: 10, y: 20 }

[x, y] = [y, x] // Intercambiar valores de dos variables

n = [10, 20]
m = [100, ...n] //> [100, 10, 20] | Agregar 100 al comienzo de 'n' 

m = [...n, 100] //> [10, 20, 100] | Agregar 100  al final de 'n' 

// JSON (JavaScript Object Notation) | Formato de intercambio de datos


productos = [
    { "id": 1, "nombre": "Coca", "precio": 10 },
    { "id": 2, "nombre": "Pepsi", "precio": 10 },  
]

productos[1].nombre = "Secco"

// Convertir un objeto a JSON
let json = JSON.stringify(productos)    //> '[{"id":1,"nombre":"Coca","precio":10},{"id":2,"nombre":"Secco","precio":10}]'

// Convertir un JSON a objeto
let texto = '[{"id":1,"nombre":"Coca","precio":10},{"id":2,"nombre":"Secco","precio":10}]'
let productos2 = JSON.parse(texto) //> [{ "id": 1, "nombre": "Coca", "precio": 10 }, { "id": 2, "nombre": "Secco", "precio": 10 }]




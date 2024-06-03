// Definir una cadena de texto

let a = "Hola"          // Comillas dobles
let b = 'Chau'          // Comillas simples
let c = `Hola  Mundo`   // Comillas invertidas | Template string

let textoMultiLinea = `
Hola
Mundo
`

let e = "1 + 2 = " + (1 + 2) //> 1 + 2 = 3
e = `1 + 2 = ${1 + 2}`       //> 1 + 2 = 3 

let nombre = "Juan", apellido = "Perez"
let nombreCompleto = nombre + " " + apellido    // Concatenacion
nombreCompleto = `${nombre} ${apellido}`        // Template string | Interpolacion de variables


// Ejemplo de uso de template string en un documento HTML
let html = `
<!DOCTYPE html>
<html>
    <head>
        <title>Titulo</title>
    </head>
    <body>
        <h1>Hola ${nombreCompleto}</h1>
    </body>
</html>
` // Multilinea e interpolacion de variables

console.log(html)

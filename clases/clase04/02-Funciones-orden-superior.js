
let numeros = [1, 1, 3, 5, 8, 13, 21]

// Quiero duplicar todos los numeros
let dobles = []
for(let x of numeros){
    let y = x * 2;
    dobles.push(y)
}

dobles //> [2,2,6,10,8,13,21]

// Quiero triplicar todos los numeros
let triples = []
for(let x of numeros){
    let y = x * 3;
    triples.push(y)
}

// Las dos funciones anteriores son muy parecidas solo cambia la operacion

// 'transformar' es una funcion que recibe un numero y devuelve un numero
function mapear(lista, transformar){
    let resultado = []
    for(let x of lista){
        let y = transformar(x)
        lista.push(y)
    }
    return resultado
}

// Defino 2 funciones que reciben un numero y devuelven un numero
let doble  = x => x * 2
let triple = x => x * 3


doble(100) //> 200
triple(1000) //> 3000

// Uso la funcion 'mapear' para duplicar y triplicar los numeros
dobles = mapear(numeros, doble)
triples = mapear(numeros, triple)

// Puede definir la funcion 'transformar' en el momento
cubos = mapear(numeros, x => x*x*x)

const agenda = [
    { nombre: "Juan",  edad: 20 },
    { nombre: "Maria", edad: 15 },
    { nombre: "Jose",  edad: 30 }
]

let nombres = mapear(agenda, p => p.nombre)
// La funcion mapear tiene una version en los array llamada 'map'
nombres = agenda.map( p => p.nombre)


let edades = mapear(agenda, p => p.edad)
edades = agenda.map( p => p.edad )

// Filtrar los numeros que cumplen una condicion
function filtrar(lista, condicion){
    let resultado = []
    for(let x of lista){
        if(condicion(x))
            resultado.push(x)
    }
    return resultado
}

let esPar = n => n % 2 == 0
let esImpar = n => n % 2 == 1
let pares = filtrar(numeros, esPar)
let impares = filtrar(numeros, esImpar)


let mayores = filtrar(agenda, p => p.edad >= 18)

// O bien con una funcion auxiliar
let esMayor = p => p.edad >= 18

mayores = filtrar(agenda, esMayor) 
mayores = agenda.filter(esMayor)  // La funcion 'filter' esta en los arrays

mayores //> [
//     {nombre: "Juan", edad: 20},
//     {nombre: "Jose", edad: 30}
// ] 

mayores = agenda.filter( p => p.edad >= 18)
nombres = mayores.map(p => p.nombre)
nombres //> ["Juan", "Jose"]

// Las funciones se pueden encadenar

// Filtrar los mayores de edad, obtener sus nombres, ordenarlos y mostrarlos en orden inverso
nombres = agenda
    .filter(esMayor)
    .map(p => p.nombre)
    .sort()
    .reverse()


// Ordenar la agenda por nombre
agenda.sort( (a,b) => a.nombre > b.nombre)

// Ordenar la agenda por edad
agenda.sort( (a,b) => a.edad - b.edad)


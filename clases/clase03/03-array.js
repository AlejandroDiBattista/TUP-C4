/// Array o Arreglo o lista (coleccion ordenada de elementos)


let e0 = 20
let e1 = 30
let e2 = 40
let e3 = 50

let promedio = (e0 + e1 + e2 + e3) / 4

// En lugar de definir una variable para cada elemento, se puede definir un arreglo 
let e = [20, 30, 40, 50]
e[0]        //> 20 | Acceder al primer elemento
e[1] = 100  // Modificar el segundo elemento

e           //> [20, 100, 40, 50]

function sumar(lista) { // Funcion que suma los elementos de un arreglo
    let suma = 0
    lista.forEach(element => suma += element)
    return suma 
}

// 
e.length            //> 3  | Cantidad de elementos

e[e.length - 1] = 1000      // Acceder al ultimo elemento
a //> [10, 100, 40, 1000]
e[e.length - 2] = 2000      // Acceder al penultimo elemento
a //> [10, 100, 2000, 1000]


// Funcion at() para acceder a un elemento por su posicion
e.at(-1)    //> 1000 | Ultimo elemento
e.at(-2)    //> 100  | Penultimo elemento

// Funciones para agregar o quitar elementos
e.push(50)  // Agregar un elemento al final
e.pop()     // Quitar el ultimo elemento

e.unshift(10)   // Agregar un elemento al principio
e.shift()       // Quitar el primer elemento


// Sacar parte de un array
e.slice(1, 3)   //> [100, 2000] | Sacar los elementos 1 y 2 (del 1 al 3-1) Incluye el 1 y excluye el 3
e.splice(1, 2)  // Quitar los elementos 1 y 2
e.splice(1, 2, 100, 200) // Quita los elementos 1 y 2 y agregar los elementos 100 y 200 en la posicion 1

// Consultar un array
e.includes(3)       //> false | Consultar si el elemento 3 esta en el array
e.indexOf(100)      //> 1     | Consultar la posicion del elemento 100

// Desestructuracion de arreglos (destructuring) | Asignar elementos a variables
numeros = [1, 10, 3, 5, 8, 13]
let [a, b, c, ...resto] = numeros
// a = numeros[0]
// b = numeros[1]
// c = numeros[2]
// resto = numeros.slice(3)


// Tipico uso en react.js
const [contador, setContador] = useState(0)

// Desestructuracion de arreglos anidados
let mix = [10, [100, 200], 20]
let [primero, [cien, dosciento], tercero] = mix 

// primero = mix[0]
// cien = mix[1][0]
// dosciento = mix[1][1]
// [cien, dosciento] = mix[1]
// tercero = mix[2]


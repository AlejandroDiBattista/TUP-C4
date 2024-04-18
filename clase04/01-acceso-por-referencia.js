

// Los array y los objetos son tipos de datos compuestos
let numeros = [10, 20, 30, 40, 50]
typeof numeros //> "object"

let persona = { nombre: "Juan", edad: 30 }
typeof persona //> "object"

persona.apellido = "Perez"

persona         //> { nombre: 'Juan', edad: 30, apellido: 'Perez' }

// Acceso a las propiedades de un objeto
Object.keys(persona)    //> [ 'nombre', 'edad', 'apellido' ]
Object.values(persona)  //> [ 'Juan', 30, 'Perez' ]

// Los array son objetos cuyas claves son numeros
Object.keys(numeros)    //> [ '0', '1', '2', '3', '4' ]

numeros //> [ 10, 20, 30, 40, 50]

// Acceso por referencia
let numeros2 = numeros

numeros2                //> [ 10, 20, 30, 40, 50]
numeros2[1] = 1000
numeros2                //> [ 10, 1000, 30, 40, 50]
numeros                 //> [ 10, 1000, 30, 40, 50]

// Copiar "a mano"
// Forma tradicional
let copia 
copia = []
for(let i = 0; i < numeros.length; i++)
    copia[i] = numeros[i]

// Forma abreviada
copia = []
for(let x of numeros){ // for(of)
    copia.push(x)
}

// Forma abreviada con ... (spread operator)
copia = [...numeros] 

// Copiar un objeto "a mano"
copiaPersona = {}
for(let clave of Object.keys(persona))
    copiaPersona[clave] = persona[clave]

// Forma abreviada de recorrer las claves de un objeto
for(let clave in persona)       // for(in)
    copiaPersona[clave] = persona[clave]


copiaPersona = {...persona} // Copia objeto 



function copiarArray(lista){
    return [...lista]
}

numero2 = copiarArray(numeros)

// Constructor (Crean objetos) van en mayusculas
function CrearPersona(nombre, apellido, edad=18){
    return {
        nombre: nombre,
        apellido: apellido,
        edad: edad
    }
}

let juan  = CrearPersona("Juan", "Perez")
let maria = CrearPersona("Maria", "Diaz")

function sumar(a,b){
    if(b == undefined) // Asignar un valor por defecto
        b = 0
    return a + b
}


// Llamadas a la funcion sumar
sumar(2, 3)             //> 5
sumar(1, 2, 3, 4)       //> 3 | Ignora los argumentos adicionales
sumar(1)                //> 1 | Usa el valor por defecto
sumar()                 //> NaN | No se puede sumar undefined

let s = sumar           // Copio la referencia a la funcion o "alias"
s(1, 2)               // === sumar(1, 2) //> 3 

// Declacion de funcion
function sumar1(a=0, b=0){ // Con valores por defecto
    return a + b
}

// Funcion como expresion
const sumar2 = function (a, b){
    return a + b
}

// Funcion con flecha gorda
const suma3 = (a, b) => {
    return a + b
}

// Compacta del flecha gorda
const suma4 = (a, b) => a + b 

// Cuando tiene un solo argumento se puedo omitir los ()
const inc = x => x + 1 

// Funciones dentro de funciones (funciones anidadas)
function mostrarLista(lista){
    function mostrarItem(item){
        console.log(item)
    }

    for(let item of lista)
        mostrarItem(item)
}


// Funcion que retorna funcion
function crearOperacion(operador){
    let resultado = null 
    if(operador=="+")
        resultado = (a,b) => a + b ;
    else if(operador == "-")
        resultado = (a,b) => a - b;
    else if(operador == "*")
        resultado = (a,b) => a * b;
    else if(operador == "/")
        resultado = (a,b) => a / b
    return resultado
}

let f = crearOperacion("+")
f(1,2) //> 3

f = crearOperacion("*")
f(2,3) //> 6

sumar2(5,7) //> 12




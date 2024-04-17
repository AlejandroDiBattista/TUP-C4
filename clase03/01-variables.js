
// Tipos primitivos

let nombre              // Declara una variable (pero no la define)

typeof nombre           //> undefined
nombre = "Juan"         // Define la variable (asigna un valor)

typeof nombre           //> string

let apellido = "Perez"  // Declara y define una variable en una sola linea
let edad = 30           // Declara y define una variable numerica

/// JavaScript es un "lenguaje dinamico"

let valor = "Hola"      //> string
valor = 100             //> number
valor = true            //> boolean

// El tipo de datos puede cambiar con una nueva asignacion

/// JavaScript es un lenguaje "debilmente tipado"

// Hacer conversiones de tipos de datos en forma automatica

// Suma un numero 
let sumaNumeros = 10 + 20                              //> 30

// Concatena dos cadenas
let nombreCompleto = "Juan" + " " + "Perez"     //> "Juan Perez"

// Suma un numero y una cadena ¿¿¿¿?????

"100" + 5       //> "1005"  | Como no existe "+" para sumar un numero y una cadena, se concatena los valores, para eso debe convertir el numero a cadena

// Restar una cadena y un numero ¿¿¿¿?????
"100" - 5       //> 95      | Como no existe "-" para restar una cadena y un numero, se convierte la cadena a numero

// Restar una cadena que no es un numero de un numero
"a" - 5         //> NaN     | Trata de convertir la cadena y no puede, por lo que devuelve NaN

/// Como se ingresan los numeros en JavaScript

let x                   
x = 1000                // entero
x = 1000.1              // flotante o decimal
x = 1.0e3               // notacion cientifica
x = 0x03E8              // hexadecimal
x = 0b001111101000      // binario
x = 0o3234              // octal

// En todos los casos se almacena el mismo valor (1000) en la variable x
// solo que se usa distintas formas de ingresarlo


/// Operaciones aritmeticas

let suma = 1 + 2        //> 3
let producto = 2 * 3    //> 6
let division = 10 / 2   //> 5
let potencia = 2 ** 3   //> 8
let resto = 10 % 3      //> 1
let esPar   = x % 2 === 0   // Si el resto de la division por 2 es 0, entonces es par
let esImpar = x % 2 !== 0   // Si el resto de la division por 2 es distinto de 0, entonces es impar

let expresion = 2 + 3 * 4  //> 14 | La multiplicacion tiene mayor prioridad que la suma


/// Presedencia de operadores (orden de ejecucion)
// 01. Paréntesis () - Precedencia más alta
// 02. Miembros . []
// 03. Llamadas a funciones ()
// 04. Incremento/Decremento ++ --
// 05. Negación lógica y Bitwise NOT ! ~
// 06. Multiplicación/División/Modulo * / %
// 07. Adición/Sustracción + -
// 08. Desplazamiento bitwise << >> >>>
// 09. Relacionales < <= > >=
// 10. Igualdad == != === !==
// 11. Bitwise AND &
// 12. Bitwise XOR ^
// 13. Bitwise OR |
// 14. AND lógico &&
// 15. OR lógico ||
// 16. Condicional (ternario) ? :
// 17. Asignación = += -= *= /= %= <<= >>= >>>= &= ^= |=
// 18. Yield yield
// 19. Coma ,


// Comparacion por igualdad 
// = => Asignacion          (asigna un valor a una variable)
// == => Igualdad           (convierte los valores a un mismo tipo de dato y luego compara)
// === => Igualdad estricta (compara el valor y el tipo de dato)

// Comparacion de cadenas
"uno" == "dos"      //> false | Orden alfabetico (del diccionario)
"uno" != "dos"      //> true
"uno" === "uno"     //> true
"100" == 100        //> true  | Convierte la cadena a numero
"100" === 100       //> false  | No convierte la cadena a numero y compara el tipo de dato


if (edad = 18) {    // Error comun, asigna 18 a edad y luego evalua si es verdadero
    console.log("Hoy es mayor")
}

let divisionMultiple = 8 / 4 / 2 //> 1  | De izquierda a derecha
let a = b = c = 1                //> 1  | Asigna 1 a c, luego a b y luego a a (de derecha a izquierda)

// Operadores de asignacion
// x = x OP s se traduce a x OP= s

x = x + s   // Acumulador
x += s      // Forma abreviada | Sumele s a x

x *= 3      // x = x * 3 | Multiplicador | Multiplica x por 3

x &&= true 
x = x && true 

// Contadores

x = x + 1       // Contador | Forma tradicional
x += 1          // Forma abreviada
x++             // Forma abreviadisima | Incrementa x en 1 


/// Ejemplo de suma de un array de numeros (Usa)
suma = 0 
for (let i = 0; i < numeros.length; i++){ // Autoincremento de 'i'
    let x = numeros[i]
    suma += x   // Acumulador
}


// Variables booleanas

let esMenor = a < 10
true && xxxx    // Cortocircuito | Si es true, ejecuta xxxx
true || xxxx    // Cortocircuito | Si es false, ejecuta xxxx


true && console.log("Hola")     // Ejecuta console.log("Hola")
false && console.log("Hola")    // No ejecuta console.log("Hola")  

/// Valores Falsey 
// false, 0, "", null, undefined es false
// Todos los demas valores son true


/// Conversion de tipos de datos (casting) o coercion 
// Convertir cualquier tipo a numero
Number("100")       //> 100
Number("Hola")      //> NaN
Number(true)        //> 1
Number(false)       //> 0
Number("")          //> 0
Number([])          //> 0
Number([1])         //> 1
Number([1,2])       //> NaN

// Conversion implicita (automatica)
100 + true          //> 101
+"100"              //> 100
"hola" + true       //> "holatrue"

// Convertir cualquier tipo a cadena
String(10)                  //> "10"
String(true)                //> "true"
String("Hola")              //> "Hola"
String(null)                //> "null"
String(undefined)           //> "undefined"
String([])                  //> ""
String([1,2])               //> "1,2"
String({})                  //> "[object Object]"
String({nombre: "Juan"})    //> "[object Object]"

// Tambien se puede convertir a cadena con el metodo toString
(100).toString()            //> "100"
true.toString()             //> "true"
[1,2].toString()            //> "1,2"
({}).toString()             //> "[object Object]"

// Convertir cualquier tipo a booleano
Boolean(100)        //> true
Boolean(0)          //> false
Boolean("")         //> false
Boolean("true")     //> true
Boolean("false")    // true 
Boolean(" ")        //> true
" ".length      //> 1
"".length       //> 0 

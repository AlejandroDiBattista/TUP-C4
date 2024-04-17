let e0 = 20
let e1 = 30
let e2 = 40

    (e0 + e1 + e2) / 3

let e = [20, 30, 40]

e[0]
e[1] = 100
e //> [20, 100, 40]

function sumar(lista) {
    let suma = 0
    lista.forEach(element => suma += element)
    return suma 
}

e.length //> 3
e[e.length - 1] = 1000  // ultimo
a //> [10, 100, 1000]
e[e.length - 2] = 1000  //penultimo

e.at(-1)
e.at(-2)
e.slice(1, 2)
e.includes(3)
e.indexOf(100)

numeros = [1, 10, 3, 5, 8, 13]
let [a, b, c, ...resto] = numeros
// a = numeros[0]
// b = numeros[1]
// c = numeros[2]
resto = numeros.slice(3)


const [contador, setContador] = useState(0)

let mix = [10, [100, 200], 20]
let [primero, [cien, dosciento], tercero] = mix 



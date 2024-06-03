// Funciones para agregar, cambiar y borrar productos usando inmutabilidad

let productos = [
    {id: 1, nombre: "Coca Cola",  precio: 200},
    {id: 2, nombre: "Pepsi Cola", precio: 150},
    {id: 3, nombre: "Fanta",      precio: 100},
    {id: 4, nombre: "Mirinda",    precio: 120},
    {id: 5, nombre: "Sprite",     precio: 180},
]

const agregar = (productos, producto)=>
    [...productos, producto]

const cambiar = (productos, producto) => 
    productos.map(p => p.id === producto.id ? {...p, ...producto} : p)

const borrar = (productos, id) => 
    productos.filter(p => p.id !== id)

let agregado = agregar(productos, {id: 6, nombre: "7up", precio: 160});
let cambiado = cambiar(productos, {id: 4, precio: 3000})
let borrado  = borrar(productos, 3);

const log = console.log

log('Original',productos)
log('Agragado',agregado);
log('Cambiado',cambiado)
log('Borrado',borrado)

const igual = (a, b) => (a.length === b.length) && a.every((elemento, indice) => elemento === b[indice]);
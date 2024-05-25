let productos = [
    { id: 1, nombre: "Coca Cola", precio: 100, cantidad: 2 },
    { id: 2, nombre: "Pepsi", precio: 90, cantidad: 3 },
    { id: 3, nombre: "Fanta", precio: 80, cantidad: 30 },
    { id: 4, nombre: "Sprite", precio: 70, cantidad: 4 },
    { id: 5, nombre: "7Up", precio: 60, cantidad: 5 },
    { id: 6, nombre: "Mirinda", precio: 50, cantidad: 6 },
    { id: 7, nombre: "Manaos", precio: 40, cantidad: 7 },
    { id: 8, nombre: "Secco", precio: 30, cantidad: 8 },
    { id: 9, nombre: "Villa del Sur", precio: 20, cantidad: 9 },
    { id: 10,nombre: "Villavicencio", precio: 10, cantidad: 10 }
]

let carrito = []

function total() {
    let total = 0
    for (let {precio,cantidad} of carrito) {
        total += precio * cantidad;
    }
    return total
}

function agregarCarrito(id) {
    let producto = productos.find(p => p.id == id)
    let item = carrito.find(i => i.id == id)

    if (item) {
        item.cantidad++
    } else {
        carrito.push({ id: id, nombre: producto.nombre, precio: producto.precio,  cantidad: 1 })
    }

    producto.cantidad--
}

function sacarCarrito(id){
    let item = carrito.find(i => i.id == id)
    item.cantidad--

    let producto = productos.find(p => p.id == id)
    producto.cantidad++
}

function listaProductos(){
    return productos.filter(p => p.cantidad > 0)
}

function listaCarrito(){
    return carrito.filter(c => c.cantidad > 0)
}

export { listaProductos, listaCarrito, total, agregarCarrito, sacarCarrito }
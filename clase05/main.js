import { listaCarrito, listaProductos, total, agregarCarrito, sacarCarrito } from './datos.js'

const Linea = ({ id, cantidad, nombre, precio }) =>
    `<li>
        <span>${cantidad} ${nombre} $${precio * cantidad}</span>
        <button onclick="quitar(${id})">Sacar</button>
     </li>`

const Carrito = () =>
    `<ul>
        ${listaCarrito().map(item => Linea(item)).join('')}
     </ul>
     <p>Total: <b>$${total()}</b></p>`

const Producto = ({ id, nombre, precio, cantidad }) =>
    `<li>
        <div>${nombre} a $${precio} </div>
        <span><i>Quedan ${cantidad} unidades</i></span>
        <button onclick="comprar(${id})">Comprar</button>
     </li>`

const Productos = () =>
    `<ul>
      ${listaProductos().map(producto => Producto(producto)).join('')}
     </ul>`


window.comprar = function (id) {
    agregarCarrito(id)
    actualizar()
}

window.quitar = function (id) {
    sacarCarrito(id)
    actualizar()
}

function actualizar() {
    let listado = document.getElementById(`listado`)
    listado.innerHTML = Productos()

    let carrito = document.getElementById(`carrito`)
    carrito.innerHTML = Carrito()
}

actualizar();
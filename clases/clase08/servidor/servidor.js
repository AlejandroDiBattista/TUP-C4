import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(express.json())
app.use(morgan("dev"))

let productos = [
    { id: 1, nombre: "Coca Cola", precio: 100 },
    { id: 2, nombre: "Pepsi", precio: 110 },
    { id: 3, nombre: "Fanta", precio: 90 },
    { id: 4, nombre: "Mirinda", precio: 95 },
    { id: 5, nombre: "Sprite", precio: 105 }
]
// CRUD

function proximoId() {
    return Math.max(...productos.map(p => p.id)) + 1
}

app.use((req, res, next) => {
    if (req.method == "PUT" ||
        req.method == "DELETE" ||
        req.method == "GET") {
        
        const { id } = req.params
        const producto = productos.find(p => p.id == id)
        req.header.producto = producto
    }
    console.log("Middleware")
    next()
    if(req.method == "GET"){
        res.data.iva = res.data.precio * 0.21
        res.data.precio = 0
    }
})
function login() {
    return (req, res, next) => {
        if (req.headers.authorization) {
            next()
        } else {
            res.status(401).json({ error: "No autorizado" })
        }
    }
}

// Create
app.post("/productos", login(), (req, res) => {
    const producto = req.body

    const id = proximoId()
    productos = [...productos, { id, ...producto }]

    res.json({ id })
})

app.use(login())

// Read All
app.get("/productos", (req, res) => {
    res.json(productos)
})

// Read One
app.get("/productos/:id", (req, res) => {
    let producto = req.header.producto
    res.json(producto)
})

// Update
app.put("/productos/:id", login(),(req, res) => {
    // const { id } = req.params
    // let producto = productos.find(p => p.id == id)
    const producto = req.header.producto
    if (producto) {
        const producto = req.body
        productos = productos.map(
            p => p.id == id ? { ...p, ...producto } : p)
        res.send(`Producto ${id} actualizado`)
    } else {
        res.status(404).json({ error: "Producto no encontrado" })
    }
})

// Delete
app.delete("/productos/:id", login(), (req, res) => {
    const producto = req.header.producto
    if (producto) {
        productos = productos.filter(p => p.id != id)
        res.json({ ok: true })
    } else {
        res.status(404).json({ error: "Producto no encontrado" })
    }
    }
)
app.listen(3000, () => {
    console.log("Servidor en 3000")
    console.log("http://localhost:3000/")
}   
)
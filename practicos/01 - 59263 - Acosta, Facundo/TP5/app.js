import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())
app.use(express.static('./datos'))

let datos = [
    {id: 1, nombre: 'Juan', apellido: 'Perez', edad: 30, borrado: false, actualizado: 0},
    {id: 2, nombre: 'Ana', apellido: 'Gomez', edad: 25, borrado: false, actualizado: 1},
    {id: 3, nombre: 'Pedro', apellido: 'Garcia', edad: 40, borrado: false, actualizado: 2},
    {id: 4, nombre: 'Maria', apellido: 'Rodriguez', edad: 35, borrado: false, actualizado: 3},
    {id: 5, nombre: 'Luis', apellido: 'Fernandez', edad: 28, borrado: false, actualizado: 4},
    {id: 6, nombre: 'Laura', apellido: 'Gonzalez', edad: 22, borrado: false, actualizado: 5},
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    res.set('Mi-mensaje', 'Este dato lo puse yo')
    res.status(200)
    res.json(datos)
});

function actualizar(persona){
    let i = datos.findIndex(p => p.id === persona.id)

    persona.borrado = false 
    persona.actualizado = new Date()

    datos[i] = persona
}

function agregar(persona){
    persona.id = datos.length + 1
    datos.push(persona)
}

app.put('/personas', (req, res) => {
    // Implementar SET
    
    let persona = req.body

    if(persona.id){ // Modificacion
        let i = datos.findIndex(p => p.id === persona.id)
        if(i < 0) {
            res.status(404)
            res.json({error: "No se encontro la persona"})
        } else {
            actualizar(persona)
            res.status(201)
            res.json(persona)
        }
    } else { // Alta
        agregar(persona)
        res.status(201)
        res.json(persona)
    }
})

export default app
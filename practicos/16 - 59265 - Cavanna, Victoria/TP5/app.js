import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        edad: 25,
        borrado: false,
        actualizado: Date.now()
    },
    {
        id: 2,
        nombre: "María",
        apellido: "González",
        edad: 30,
        borrado: false,
        actualizado: Date.now()
    },
    {
        id: 3,
        nombre: "Pedro",
        apellido: "Rodríguez",
        edad: 40,
        borrado: false,
        actualizado: Date.now()
    },
    {
        id: 4,
        nombre: "Ana",
        apellido: "Fernandez",
        edad: 16,
        borrado: false,
        actualizado: Date.now()
    },
    {
        id: 5,
        nombre: "Agustina",
        apellido: "Sanchez",
        edad: 40,
        borrado: false,
        actualizado: Date.now()
    },
    {
        id: 6,
        nombre: "Lucas",
        apellido: "Gomez",
        edad: 18,
        borrado: false,
        actualizado: Date.now()
    }
]
const validarDatos = (persona) => {
    if (!persona.nombre || !persona.apellido || !persona.edad){
        throw new Error("Datos inválidos. Faltan campos requeridos")
    }
}
app.get('/personas', (req, res) => {
    const data = datos.filter((p) => !p.borrado)
    res.status(200).json(data);
});

app.put('/personas', (req, res) => {
    let persona = req.body 
    
    if (persona.id !== undefined ) {
        let index = datos.findIndex(p => p.id === persona.id);
        if (index === -1){
            return res.status(404).send("No se encontró la persona")
        }
        if (persona.borrado === true){
            datos[index].borrado = true;
            datos[index].actualizado = Date.now();
            return res.status(201).send(datos[index])
        }
        datos[index] = {...persona, borrado:false, actualizado: Date.now()};
        return res.status(201).send(datos[index]);
        
    }
    validarDatos(persona)
    let nextId = Math.max(...datos.map(persona => persona.id)) + 1;
    datos.push({ id: nextId, ...persona, actualizado: Date.now()});
    res.status(201).send(datos[datos.length - 1]);
})

export default app
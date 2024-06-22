import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {id:1, nombre: 'Maria', apellido: 'Antonieta', edad: 20, borrado:false, actualizado: Date.now()},
    {id:2, nombre: 'Juan', apellido: 'Diaz', edad: 22, borrado:false, actualizado: Date.now()},
    {id:3, nombre: 'Marcos', apellido: 'Antonio', edad: 25, borrado:false, actualizado: Date.now()},
    {id:4, nombre: 'Edgar', apellido: 'Aguirre', edad: 50, borrado:false, actualizado: Date.now()},
    {id:5, nombre: 'Richard', apellido: 'Watterson', edad: 40, borrado:false, actualizado: Date.now()},
    {id:6, nombre: 'Terry', apellido: 'Bogard', edad: 30, borrado:false, actualizado: Date.now()},
    {id:7, nombre: 'Bruce', apellido: 'Wayne', edad: 35, borrado:false, actualizado: Date.now()},
    {id:8, nombre: 'Saul', apellido: 'Mena', edad: 29, borrado:false, actualizado: Date.now()}
]

const validarPersona = (persona) => {
    if (!persona.id) {
        persona.id = datos.length + 1;
    }
    return persona;
}

const crearPersona = (nuevaPersona) => {
    const personaValidada = validarPersona(nuevaPersona);
    datos.push(personaValidada);
    return personaValidada;
}

app.post('/personas', (req, res) => {
    const nuevaPersona = req.body;
    const personaCreada = crearPersona(nuevaPersona);

    if (personaCreada) {
        res.status(201).json(personaCreada);
    } else {
        res.status(500).json({ error: 'Error al crear la persona' });
    }
});

app.get('/personas', (req, res) => {
    const personasNoBorradas = datos.filter(persona => !persona.borrado);
    
    if (personasNoBorradas.length >= 5) {
        res.status(200).json(personasNoBorradas);
    } else {
        res.status(500).json({ error: 'No hay suficientes personas no borradas' });
    }
});

app.put('/personas', (req, res) => {
    const personaActualizada = validarPersona(req.body);
    const index = datos.findIndex(persona => persona.id === personaActualizada.id);
    
    if (index !== -1) {
        if (personaActualizada.borrado) {
            datos[index].borrado = true;
            datos[index].actualizado = Date.now();
            res.json(datos[index]);
        } else {
            datos[index] = personaActualizada;
            res.json(personaActualizada);
        }
    } else {
        res.status(404).json({ error: 'Persona no encontrada' });
    }
});

app.delete('/personas', (req, res) => {
    const personaAEliminar = req.body;
    const index = datos.findIndex(persona => persona.id === personaAEliminar.id);
    
    if (index !== -1) {
        if (datos[index].borrado) {
            res.status(400).json({ error: 'La persona ya está marcada como borrada' });
        } else {
            datos[index].borrado = true;
            datos[index].actualizado = Date.now();

            if (datos[index].borrado) {
                res.status(201).json({ message: 'Persona marcada como borrada correctamente' });
            } else {
                res.status(500).json({ error: 'Error al marcar a la persona como borrada' });
            }
        }
    } else {
        res.status(404).json({ error: 'Persona no encontrada, no se pudo marcar como borrada' });
    }
});


export default app
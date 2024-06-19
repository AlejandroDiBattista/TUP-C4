import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'María', apellido: 'González', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Carlos', apellido: 'López', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', edad: 28, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Luis', apellido: 'Rodríguez', edad: 32, borrado: false, actualizado: Date.now() }
];

// Endpoint para obtener todas las personas no borradas
app.get('/personas', (req, res) => {
    const data = datos.filter(persona => !persona.borrado);
    res.status(200).json(data);
});

// Endpoint para crear, actualizar o borrar una persona
app.put('/personas', (req, res) => {
    const persona = req.body;
    const id = persona.id;

    if (id) {
        // Actualizar o borrar persona existente
        const index = datos.findIndex(p => p.id === id);

        if (index !== -1) {
            if (persona.borrado) {
                // Marcar como borrado
                datos[index] = {
                    ...datos[index],
                    borrado: true,
                    actualizado: Date.now()
                };
            } else {
                // Actualizar persona
                datos[index] = {
                    ...datos[index],
                    ...persona,
                    actualizado: Date.now()
                };
            }
            res.status(201).json(datos[index]);
        } else {
            res.status(404).json({ error: 'Persona no encontrada o ya borrada' });
        }
    } else {
        // Crear nueva persona ok
        const nuevoId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        const nuevaPersona = {
            id: nuevoId,
            ...persona,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(nuevaPersona);
        res.status(201).json(nuevaPersona);
    }
});

export default app;

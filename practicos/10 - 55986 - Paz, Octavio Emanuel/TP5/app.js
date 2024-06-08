import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Cecilio', apellido: 'Rodriguez', edad: 18, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Joaquin', apellido: 'Pereyra', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Juan', apellido: 'Musso', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Erling', apellido: 'Halland', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Elon', apellido: 'Musk', edad: 45, borrado: false, actualizado: Date.now() },
    { id: 6, nombre: 'Lionel', apellido: 'Messi', edad: 36, borrado: false, actualizado: Date.now() },
    { id: 7, nombre: "Maria", apellido: "Roldan", edad: 50, borrado: true, actualizado: Date.now() },
    { id: 8, nombre: "Candelaria", apellido: "Caceres", edad: 21, borrado: false, actualizado: Date.now() },
    { id: 9, nombre: "Sergio", apellido: "Aguero", edad: 29, borrado: true, actualizado: Date.now() }
];


app.get('/personas', (req, res) => {
    const noBorrados = datos.filter(persona => !persona.borrado);
    res.status(200).json(noBorrados);
});


app.put('/personas', (req, res) => {
    const persona = req.body;

    if (persona.id === undefined) {
        const nuevaPersona = {
            ...persona,
            id: datos.length ? Math.max(...datos.map(persona => persona.id)) + 1 : 1,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(nuevaPersona);
        res.status(201).json({ id: nuevaPersona.id });
    } else {
        const index = datos.findIndex(p => p.id === persona.id);
        if (index === -1) {
            res.status(404).send();
        } else {
            const personaActualizada = {
                ...datos[index],
                ...persona,
                actualizado: Date.now()
            };
            datos[index] = personaActualizada;
            res.status(201).json(personaActualizada);
        }
    }
});

export default app;
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Andrea', apellido: 'Fernandez', edad: 15, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Juan', apellido: 'Musso', edad: 30, borrado: false, actualizado: Date.now() },
];

app.get('/personas', (req, res) => {
    res.json(datos.filter(persona => !persona.borrado));
});

app.put('/personas/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedItem = req.body;

    let persona = datos.find(persona => persona.id === id);

    if (persona) {
        if (updatedItem.borrado) {
            persona.borrado = true;
        } else {
            persona.nombre = updatedItem.nombre;
            persona.apellido = updatedItem.apellido;
            persona.edad = updatedItem.edad;
            persona.actualizado = Date.now();
        }
        res.status(201).json(persona);
    } else {
        res.status(404).send('Item no encontrado');
    }
});

app.put('/personas', (req, res) => {
    const nuevaPersona = req.body;
    nuevaPersona.id = datos.length ? Math.max(datos.map(persona => persona.id)) + 1 : 1;
    nuevaPersona.borrado = false;
    nuevaPersona.actualizado = Date.now();
    datos.push(nuevaPersona);
    res.status(201).json(nuevaPersona);
});

export default app;

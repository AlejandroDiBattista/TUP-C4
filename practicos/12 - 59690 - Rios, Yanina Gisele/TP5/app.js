import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: "Persona 1", apellido: "Apellido 1", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Persona 2", apellido: "Apellido 2", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Persona 3", apellido: "Apellido 3", edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Persona 4", apellido: "Apellido 4", edad: 40, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Persona 5", apellido: "Apellido 5", edad: 28, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    res.json(datos.filter(persona => !persona.borrado));
});

app.put('/personas', (req, res) => {
    let { id, nombre, apellido, edad, borrado } = req.body;

    id = parseInt(id);
    let personaIndex = datos.findIndex(p => p.id === id);

    if (personaIndex === -1) {
        id = datos.length + 1;
        datos.push({ id, nombre, apellido, edad, borrado, actualizado: Date.now() });
        res.status(201).json({ id });
    } else {
        datos[personaIndex].nombre = nombre || datos[personaIndex].nombre;
        datos[personaIndex].apellido = apellido || datos[personaIndex].apellido;
        datos[personaIndex].edad = edad || datos[personaIndex].edad;
        datos[personaIndex].borrado = borrado || datos[personaIndex].borrado;
        datos[personaIndex].actualizado = Date.now();
        res.json(datos[personaIndex]);
    }
});

app.delete('/personas', (req, res) => {
    let { id } = req.body;

    id = parseInt(id);
    let personaIndex = datos.findIndex(p => p.id === id);

    if (personaIndex === -1) {
        res.status(404).json({ message: 'Person not found' });
    } else {
        datos[personaIndex].borrado = true;
        datos[personaIndex].actualizado = Date.now();
        res.json(datos[personaIndex]);
    }
});

export default app;

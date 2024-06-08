import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: "Juan", apellido: "Perez", edad: 23, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Maria", apellido: "Martinez", edad: 20, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Sofia", apellido: "Ibarra", edad: 18, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Facundo", apellido: "Ledesma", edad: 29, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Joaquin", apellido: "Iturre", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 6, nombre: "Exequiel", apellido: "Escobedo", edad: 23, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    const personasNoBorradas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasNoBorradas);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;
    let persona;

    if (id) {
        persona = datos.find(p => p.id === id);
        if (!persona) {
            return res.status(404).send('Persona no encontrada');
        }
        persona.nombre = nombre || persona.nombre;
        persona.apellido = apellido || persona.apellido;
        persona.edad = edad !== undefined ? edad : persona.edad;
        persona.borrado = borrado !== undefined ? borrado : persona.borrado;
    } else {
        persona = {
            id: datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(persona);
    }
    persona.actualizado = Date.now();
    res.status(id ? 201 : 201).json(id ? persona : { id: persona.id });
});

export default app;
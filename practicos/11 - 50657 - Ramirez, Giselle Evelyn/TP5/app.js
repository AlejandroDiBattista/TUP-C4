import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Andrea', apellido: 'Fernandez', edad: 15, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Juan', apellido: 'Musso', edad: 30, borrado: false, actualizado: Date.now() }, 
    { id: 3, nombre: 'Alejandra', apellido: 'Ramirez', edad: 46, borrado: true, actualizado: Date.now() },
    { id: 4, nombre: 'Isabel', apellido: 'Sanchez', edad: 68, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Adrian', apellido: 'Latronico', edad: 40, borrado: true, actualizado: Date.now() },
    { id: 7, nombre: 'Anabella', apellido: 'Falconi', edad: 28, borrado: true, actualizado: Date.now() },
    { id: 8, nombre: 'Cintia', apellido: 'Falcon', edad: 36, borrado: true, actualizado: Date.now() },
    { id: 9, nombre: 'Yamila', apellido: 'Debernardi', edad: 41, borrado: true, actualizado: Date.now() },
    { id: 10, nombre: 'Ricardo', apellido: 'Nuñez', edad: 41, borrado: true, actualizado: Date.now() },
];


app.get('/personas', (req, res) => {
    const noBorrados = datos.filter(persona => !persona.borrado);
    res.status(200).json(noBorrados);
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

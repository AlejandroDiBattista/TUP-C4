import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    {
        id: 1,
        nombre: "Tea",
        apellido: "Marie",
        edad: 21,
        borrado: false,
        actualizado: Date.now(),
    },
    {
        id: 2,
        nombre: "Geneve",
        apellido: "Vivienne",
        edad: 22,
        borrado: false,
        actualizado: Date.now(),
    },
    {
        id: 3,
        nombre: "Tunna",
        apellido: "Kim",
        edad: 25,
        borrado: false,
        actualizado: Date.now(),
    },
    {
        id: 4,
        nombre: "Monica",
        apellido: "Beverina",
        edad: 57,
        borrado: false,
        actualizado: Date.now(),
    },
    {
        id: 5,
        nombre: "Angel",
        apellido: "Xoxo",
        edad: 20,
        borrado: false,
        actualizado: Date.now(),
    },
];

app.get('/personas', (req, res) => {
    const activePeople = datos.filter(person => !person.borrado);
    res.json(activePeople);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;
    let persona = datos.find(p => p.id === id);

    if (id) {
        if (!persona) {
            return res.status(404).send('Persona no encontrada');
        }
        persona.nombre = nombre ? nombre : persona.nombre;
        persona.apellido = apellido ? apellido : persona.apellido;
        persona.edad = edad !== undefined ? edad : persona.edad;
        persona.borrado = borrado !== undefined ? borrado : persona.borrado;
    } else {
        const newId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        persona = { id: newId, nombre, apellido, edad, borrado: false, actualizado: Date.now() };
        datos.push(persona);
    }
    persona.actualizado = Date.now();
    res.status(201).json(persona);
});

app.listen(3000, () =>{
    console.log("El servidor está en el puerto 3000");
});

export default app;

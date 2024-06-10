import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let personas = [
  {
    id: 1,
    nombre: "Ana",
    apellido: "Lopez",
    edad: 28,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 2,
    nombre: "David",
    apellido: "Garcia",
    edad: 35,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 3,
    nombre: "Juan",
    apellido: "Perez",
    edad: 58,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 4,
    nombre: "Jose",
    apellido: "Hernandez",
    edad: 22,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 5,
    nombre: "Luis",
    apellido: "Martinez",
    edad: 45,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 6,
    nombre: "Lucia",
    apellido: "Gomez",
    edad: 21,
    borrado: false,
    actualizado: Date.now(),
  },
];

app.get("/personas", (req, res) => {
  const getPersonas = personas.filter((persona) => !persona.borrado);
  res.status(200).json(getPersonas);
});

app.put("/personas", (req, res) => {
  const { id, nombre, apellido, edad, borrado } = req.body;

  if (id) {
    const indexPersona = personas.findIndex((persona) => persona.id === id);

    if (indexPersona !== -1) {
      if (borrado) {
        personas[indexPersona].borrado = true;
      } else {
        if (nombre) personas[indexPersona].nombre = nombre;
        if (apellido) personas[indexPersona].apellido = apellido;
        if (edad !== undefined) personas[indexPersona].edad = edad;
      }
      personas[indexPersona].actualizado = Date.now();
      return res.status(201).json(personas[indexPersona]);
    } else {
      return res.status(404).send("Persona no encontrada 😔");
    }
  } else {
    const newId = personas.length
      ? Math.max(...personas.map((persona) => persona.id)) + 1
      : 1;
    const newPersona = {
      id: newId,
      nombre,
      apellido,
      edad,
      borrado: false,
      actualizado: Date.now(),
    };
    personas.push(newPersona);
    return res.status(201).json(newPersona);
  }
});

export default app;

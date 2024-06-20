import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {
        id: 1,
        nombre: "Alice",
        apellido: "Johnson",
        edad: 28,
        borrar: false,
        actualizado: Date.now(),
      },
      {
        id: 2,
        nombre: "Bob",
        apellido: "Smith",
        edad: 35,
        borrar: false,
        actualizado: Date.now(),
      },
      {
        id: 3,
        nombre: "Eve",
        apellido: "Davis",
        edad: 42,
        borrar: false,
        actualizado: Date.now(),
      },
      {
        id: 4,
        nombre: "Charlie",
        apellido: "Brown",
        edad: 25,
        borrar: false,
        actualizado: Date.now(),
      },
      {
        id: 5,
        nombre: "Grace",
        apellido: "Taylor",
        edad: 50,
        borrar: false,
        actualizado: Date.now(),
      },
      {
        id: 6,
        nombre: "Tiago",
        apellido: "Lopez",
        edad: 19,
        borrado: false,
        actualizado: Date.now(),
      }
    ];

    function validarPersona(persona) {
        if (!persona.nombre || !persona.apellido || !persona.edad) {
          throw new Error("Faltan campos obligatorios");
        }
      }
    

app.get('/personas', (req, res) => {
    const data = datos.filter((persona) => !persona.borrar);
    res.status(200).json(data);
});

app.put('/personas', (req, res) => {
    try {
        const { id, nombre, apellido, edad, borrado } = req.body;
    
        if (id === undefined) {
          const nuevaPersona = {
            id: datos.length + 1,
            nombre,
            apellido,
            edad,
            borrado: borrado || false,
            actualizado: Date.now(),
          };
    
          validarPersona(nuevaPersona);
          datos.push(nuevaPersona);
          return res.status(201).json(nuevaPersona);
        } else {
          const indexPersona = datos.findIndex((persona) => persona.id === id);
    
          if (indexPersona === -1) {
            return res.status(404).json({ error: "Persona no encontrada" });
          }
    
          datos[indexPersona] = {
            ...datos[indexPersona],
            ...req.body,
            actualizado: Date.now(),
          };
    
          if (borrado) {
            datos[indexPersona].borrado = true;
          }
    
          res.status(201).json(datos[indexPersona]);
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
    
    export default app;
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Homer', apellido: 'Simpson', borrado: false, actualizado: 3, edad: 39 },
    { id: 2, nombre: 'Marge', apellido: 'Simpson', borrado: false, actualizado: 3, edad: 36 },
    { id: 3, nombre: 'Bart', apellido: 'Simpson', borrado: false, actualizado: 3, edad: 10 },
    { id: 4, nombre: 'Lisa', apellido: 'Simpson', borrado: false, actualizado: 3, edad: 8 },
    { id: 5, nombre: 'Maggie', apellido: 'Simpson', borrado: false, actualizado: 3, edad: 1 },
    { id: 6, nombre: 'Ned', apellido: 'Flanders', borrado: false, actualizado: 3, edad: 60 },
    { id: 7, nombre: 'Montgomery', apellido: 'Burns', borrado: false, actualizado: 3, edad: 104 },
    { id: 8, nombre: 'Krusty', apellido: 'El Payaso', borrado: false, actualizado: 3, edad: 55 }
];

let idActual = datos.length + 1;

//  función GET
app.get('/personas', (req, res) => {
    const personasNoBorradas = datos.filter(p => !p.borrado);
    res.status(200).json(personasNoBorradas);
});

// Implementación de la función PUT
app.put('/personas', (req, res) => {
    const persona = req.body;
    
    if (persona.id) {
        const indice = datos.findIndex(p => p.id === persona.id);
        
        if (indice === -1) {
            return res.status(404).send();
        }

        if (persona.borrado) {
            datos[indice] = { ...datos[indice], borrado: true };
        } else {
            datos[indice] = { ...datos[indice], ...persona, actualizado: datos[indice].actualizado + 1 };
        }
        return res.status(201).json(datos[indice]);
    } else {
        persona.id = idActual++;
        persona.borrado = false;
        persona.actualizado = 1;
        datos.push(persona);
        return res.status(201).json(persona);
    }
});

export default app;

import express from 'express';
// import Prueba from './controladores';

const app = express();

// app.use(express.json());
app.use(  (req, res, next) => {
    console.log("Antes")
    req.query.nombre = "Juan"
    next();
    console.log("Después")
}

)
app.get('/', (req, res) => {
    console.log("Durante el GET", req.query)
    res.send('<h1>Hola</h1>');
});


// app.get('/saludar', Saludador.saludar);
// app.get('/saludar/:nombre/:apellido', Saludador.saludarNombre );

// app.post('/saludar', (req, res) => {
//     // console.log(req.body)
//     // const { nombre, apellido } = req.body;
//     res.send(`<h1>Hola, ¿cómo estás ${nombre} ${apellido}?</h1>`);
// })


app.listen(3000, () => {
    console.log("Servidor en 3000")
    console.log("http://localhost:3000/")
}   
)
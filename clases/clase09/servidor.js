import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'))
app.use(express.static('./public'));
app.use(express.json())

let contador = 1

app.get('/valor', (req, res) => {
    res.json({contador: contador});
})

app.put('/incrementar', (req, res) => {
    console.log(req.method)
    console.log("JSON> ",req.body)
    contador++;
    res.json({contador: contador});
})

app.listen(3000, () => {
    console.log('Server on port 3000');
})
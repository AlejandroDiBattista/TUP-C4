import express from 'express';
import usuario from './routers/usuario.js'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev')); // Middleware de log
app.use(express.static('public')); // Servidor de archivos estaticos

app.use(usuario)

app.get("/traer", (req, res) => {
    res.cookie('Token','EN TRAER ', 
        { maxAge: 1000 * 10 })
    res.send('Traer usuarios');
});
app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});

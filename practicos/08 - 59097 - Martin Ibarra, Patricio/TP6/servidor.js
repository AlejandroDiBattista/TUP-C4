import express from 'express';
import cookieParser from 'cookie-parser';
import Usuario from './controllers/usuario.js';
import morgan
 from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// Implementar las rutas necesarias

app.get("/usuarios", Usuario.obtenerUsuarios);
app.post('/registrar', Usuario.registrar);
app.post('/login', Usuario.login);
app.put('logout', Usuario.validarUsuario, Usuario.logout);
app.get('/info', Usuario.validarUsuario, Usuario.obtenerInfo);

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});

function crearToken() {
     return Math.random().toString().substring(2);
}




import express from 'express';
import Usuario from '../models/usuario.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.get("/usuarios", Usuario.obtenerUsuarios);
app.post('/registrar', Usuario.registrar);
app.post('/login', Usuario.login);
app.put('/logout', Usuario.validarUsuario, Usuario.logout);
app.get('/info', Usuario.validarUsuario, Usuario.obtenerInfo);

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});

function crearToken() {
    return Math.random().toString().substring(2);
}

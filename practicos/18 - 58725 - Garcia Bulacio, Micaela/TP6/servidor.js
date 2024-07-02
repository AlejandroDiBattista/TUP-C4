import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); 

let usuarios = [];

app.post('/api/register', (req, res) => {
    const { nombreUsuario, contraseña, correo, telefono, nombre, apellido } = req.body;

    const usuarioExiste = usuarios.some(u => u.nombreUsuario === nombreUsuario);
    if (usuarioExiste) {
        return res.status(400).json({ exito: false, mensaje: "El usuario ya existe" });
    }

    const nuevoUsuario = { nombreUsuario, contraseña, correo, telefono, nombre, apellido };
    usuarios.push(nuevoUsuario);
    res.status(201).json({ exito: true, usuario: nuevoUsuario });
});

app.post('/api/login', (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    const usuarioEncontrado = usuarios.find(u => u.nombreUsuario === nombreUsuario && u.contraseña === contraseña);
    if (usuarioEncontrado) {
        res.json({ exito: true, usuario: usuarioEncontrado });
    } else {
        res.status(401).json({ exito: false, mensaje: "Usuario o contraseña incorrectos" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
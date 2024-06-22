import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';

const servidor = express();
const baseDeDatosUsuarios = {};  

servidor.use(morgan('dev'));
servidor.use(cookieParser());
servidor.use(express.json());
servidor.use(express.static('public'));

servidor.post('/registro', (req, res) => {
    const { username, password } = req.body;
    console.log('Solicitud de registro:', username, password); 
    if (baseDeDatosUsuarios[username]) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    baseDeDatosUsuarios[username] = password;
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

servidor.post('/ingreso', (req, res) => {
    const { username, password } = req.body;
    console.log('Solicitud de inicio de sesión:', username, password); 
    if (baseDeDatosUsuarios[username] && baseDeDatosUsuarios[username] === password) {
        res.cookie('usuario', username, { httpOnly: true });
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    }
    res.status(400).json({ message: 'Nombre de usuario o contraseña inválidos' });
});

servidor.post('/cerrarsesion', (req, res) => {
    console.log('Solicitud de cierre de sesión'); 
    res.clearCookie('usuario');
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
});

servidor.get('/info', (req, res) => {
    const username = req.cookies.usuario;
    console.log('Solicitud de info, usuario:', username); 
    if (username) {
        return res.status(200).json({ message: `Bienvenido, ${username}` });
    }
    res.status(401).json({ message: 'No autorizado' });
});

servidor.get('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

servidor.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});

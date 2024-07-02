import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const usuarios = {};
const SECRET_KEY = 'contraseña1234';

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }));

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token no válido' });
    }
    req.usuario = decoded.usuario; // Guardar el usuario decodificado en la solicitud
    next();
  });
};

// Ruta para registrar
app.post('/api/registrar', (req, res) => {
  const { usuario, contraseña } = req.body;
  if (!usuario || !contraseña) {
    return res.status(400).json({ exito: false, mensaje: 'El nombre de usuario y la contraseña son obligatorios' });
  }
  if (usuarios[usuario]) {
    return res.status(400).json({ exito: false, mensaje: 'El usuario ya existe' });
  }
  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ exito: false, mensaje: 'Error interno' });
    }
    usuarios[usuario] = { contraseña: hashedPassword };
    res.json({ exito: true });
  });
});

// Ruta para login
app.post('/api/login', (req, res) => {
  const { usuario, contraseña } = req.body;
  if (!usuario || !contraseña) {
    return res.status(400).json({ exito: false, mensaje: 'El nombre de usuario y la contraseña son obligatorios' });
  }
  const user = usuarios[usuario];
  if (user) {
    bcrypt.compare(contraseña, user.contraseña, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ exito: false, mensaje: 'Contraseña incorrecta' });
      }
      const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1h' });

      res.cookie('token', token, {
        httpOnly: true
      });
      res.json({ exito: true });
    });
  } else {
    res.status(400).json({ exito: false, mensaje: 'Usuario no encontrado' });
  }
});


// Ruta para logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ exito: true });
});


// Ruta para obtener información si está logueado
app.get('/api/info', verificarToken, (req, res) => {
  const usuario = req.usuario;
  if (usuarios[usuario]) {
    res.json({ info: `Esta es información sensible para ${usuario}`, contraseña: usuarios[usuario].contraseña });
  } else {
    res.status(404).json({ info: 'Usuario no encontrado' });
  }
});


// Obtener lista de usuarios
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});

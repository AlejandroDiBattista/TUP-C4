import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const usuarios = {}; 
const SECRET_KEY = 'hola'; 

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

// Configurando CORS
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

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
    req.usuario = decoded.usuario; 
    next();
  });
};

// Ruta para registrar un usuario
app.post('/api/registrar', (req, res) => {
  const { usuario, contraseña } = req.body;
  if (usuarios[usuario]) {
    return res.json({ exito: false, mensaje: 'El usuario ya existe' });
  }
  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ exito: false, mensaje: 'Error interno' });
    }
    usuarios[usuario] = { contraseña: hashedPassword };
    res.json({ exito: true });
  });
});

// Ruta para realizar el login
app.post('/api/login', (req, res) => {
  const { usuario, contraseña } = req.body;



  const user = usuarios[usuario];
  if (user) {
    bcrypt.compare(contraseña, user.contraseña, (err, result) => { // Verificar
      if (err || !result) {
        return res.json({ exito: false });
      }
      const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1h' });
      // Configurar la cookie 'token' con SameSite=None y Secure=true
      res.cookie('token', token, {
        httpOnly: true, secure: true, sameSite: 'None'
      });
      res.json({ exito: true, token }); // Devolver también el token en la respuesta
    });
  } else {
    res.json({ exito: false });
  }
});

// Ruta para realizar el logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    secure: true,  // Asegúrate de que tu servidor esté configurado para HTTPS
    sameSite: 'None'
  });
  res.json({ exito: true });
});

// Ruta para obtener información sensible si el usuario está logueado
app.get('/api/info', verificarToken, (req, res) => {
  const usuario = req.usuario; 
  if (usuarios[usuario]) {
    res.json({ info: `Esta es información sensible para ${usuario}`, contraseña: usuarios[usuario].contraseña });
  } else {
    res.status(404).json({ info: 'Usuario no encontrado' });
  }
});

// Ruta para obtener la lista de usuarios (solo para propósitos de demostración)
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});

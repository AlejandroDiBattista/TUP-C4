import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

const app = express();
const usuarios = [];  
const rondasSal = 10; 
const CLAVE_SECRETA = 'tu_clave_secreta'; 

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos


app.post('/registrar', async (req, res) => {
    const { nombreUsuario, contrasena, nombre} = req.body;    
    
    const contrasenaHasheada = await bcrypt.hash(contrasena, rondasSal);
    
    if (usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario)) {
        return res.status(400).json({ mensaje: 'Usuario ya existe' });
    }
    usuarios.push({ nombreUsuario, contrasena: contrasenaHasheada, nombre});
    res.status(201).json({ mensaje: 'Usuario registrado' });
});


app.post('/iniciar-sesion', (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
    const usuario = usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario);
    if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    
    bcrypt.compare(contrasena, usuario.contrasena, (err, resultado) => {
        if (err || !resultado) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }
        
        const token = jwt.sign({ nombreUsuario }, CLAVE_SECRETA, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ mensaje: 'Inicio de sesión exitoso', usuario: { nombreUsuario: usuario.nombreUsuario, nombre: usuario.nombre} });
    });
});

app.get('/info', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ mensaje: 'No autorizado' });
    }
    try {
        const decodificado = jwt.verify(token, CLAVE_SECRETA);
        const usuario = usuarios.find(usuario => usuario.nombreUsuario === decodificado.nombreUsuario);
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ usuario: { nombreUsuario: usuario.nombreUsuario, nombre: usuario.nombre} });
    } catch (e) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
});

app.post('/cerrar-sesion', (req, res) => {
    res.clearCookie('token');
    res.json({ mensaje: 'Sesión cerrada' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});

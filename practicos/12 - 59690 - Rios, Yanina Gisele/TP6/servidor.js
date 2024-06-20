import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session'; 
import morgan from 'morgan';
import bcrypt from 'bcrypt';

const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// Configuración de la sesión
app.use(session({
    secret: 'claverijilla_secreta', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

const users = [];

// Middleware de autenticación
function authMiddleware(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).send('No autorizado');
    }
}

// Ruta de registro con encriptación
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Falta usuario o contraseña');
    }

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).send('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.send('Registro exitoso');
});

// Ruta de login con verificación de contraseña encriptada
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Usuario o contraseña incorrectos');
    }

    req.session.user = user;
    res.send('Login exitoso');
});

// Ruta de logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.send('Logout exitoso');
    });
});

// Ruta protegida
app.get('/info', authMiddleware, (req, res) => {
    res.send(`Información protegida para el usuario ${req.session.user.username}`);
});

app.listen(3001, () => {
    console.log('Servidor iniciado en http://localhost:3001');
});

import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const users = [];
const saltRounds = 10;
const SECRET_KEY = 'your_secret_key';

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));


app.post('/register', async (req, res) => {
    const { username, password, mail } = req.body;
    console.log(mail)

    const hashedPassword = await bcrypt.hash(password, saltRounds);// Verificar

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }
    users.push({ username, password: hashedPassword, mail });
    res.status(201).json({ message: 'Usuario registrado' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }


    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Inicio de sesión exitoso', user: { username: user.username, mail: user.mail } });
    });
});


app.get('/info', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = users.find(user => user.username === decoded.username);
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        res.json({ user: { username: user.username, mail: user.mail } });
    } catch (e) {
        res.status(401).json({ message: 'Token inválido' });
    }
});


app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Sesión cerrada' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
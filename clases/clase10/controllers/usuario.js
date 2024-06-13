import argon2 from 'argon2';

let usuarios = [
    { username: 'admin', password: await argon2.hash('admin')  },
];

function crearToken() {
    return Math.random().toString().substring(2);
}

function validar(req, res, next) {
    let token = req.cookies?.token 

    if (!token) {
        res.status(400).send('Falta token');
        return;
    }

    let usuario = usuarios.find(usuario => usuario.token === token);
    if (!usuario) {
        res.status(400).send('Acceso prohibido');
        return;
    }

    req.usuario = usuario;
    next()
}

function traer(req, res) {
    res.json(usuarios);
}

async function registrar(req, res) {
    let { username, password } = req.body

    if (!username || !password) {
        res.status(400).send('Faltan datos');
        return;
    }

    let usuario = usuarios.find(usuario => usuario.username === username);
    if (usuario) {
        res.status(400).send('Usuario ya existe');
        return;
    }

    password = await argon2.hash(password)
    usuarios.push({ username, password });
    res.send('Usuario registrado');
}

async function login(req, res) {
    let { username, password } = req.body

    if (!username || !password) {
        res.status(400).send('Faltan datos');
        return;
    }

    let usuario = usuarios.find(usuario => usuario.username === username);
    if (!usuario || usuario.password !== await argon2.hash( password)) {
        res.status(400).send('Usuario o contraseña incorrectos');
        return;
    }

    let token = crearToken();
    
    // res.set('Token', token)
    res.cookie('token', token)
    usuario.token = token;

    res.send('Login correcto');
}

function logout(req, res) {
    let usuario = req.usuario;
    delete usuario.token;

    res.send('Logout correcto');
}

function info(req, res) {
    let usuario = req.usuario;
    
    res.send('Información secreta 👮🏽‍♀️ ' + usuario.password);
}

export default { validar: validar, traer: traer, registrar, login, logout, info };
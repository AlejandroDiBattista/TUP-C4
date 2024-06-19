let usuarios = [
    { username: 'admin', password: 'admin' },
];

function validarUsuario(req, res, next) {
    let token = req.get('Token');
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

function obtenerUsuarios(req, res) {
    res.json(usuarios);
}

function registrar(req, res) {
    let { username, password } = req.body
    if (!username || !password) {
        res.status(400).send('Faltan datos');
        return;
    }

    let usuario = usuarios.find(usuario =>
        usuario.username === username);
    if (usuario) {
        res.status(400).send('Usuario ya existe');
        return;
    }

    usuarios.push({ username, password });
    res.send('Usuario registrado');
}

function login(req, res) {
    let { username, password } = req.body

    if (!username || !password) {
        res.status(400).send('Faltan datos');
        return;
    }

    let usuario = usuarios.find(usuario => usuario.username === username);
    if (!usuario || usuario.password !== password) {
        res.status(400).send('Usuario o contraseña incorrectos');
        return;
    }

    let token = crearToken();
    console.log("Token: ", token)
    res.set('Token', token)
    usuario.token = token;
    res.send('Login correcto');
}

function logout(req, res) {
    let usuario = req.usuario;
    delete usuario.token;
    res.send('Logout correcto');
}

function obtenerInfo(req, res) {
    let usuario = req.usuario;
    res.send('Información secreta 👮🏽‍♀️ ' + usuario.password);
}

export default { validarUsuario, obtenerUsuarios, registrar, login, logout, obtenerInfo };
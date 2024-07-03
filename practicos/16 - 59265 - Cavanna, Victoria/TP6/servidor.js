import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from "cors";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const SECRET_KEY = "secreto";
let users = [];

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

app.use(
    cors({ credentials: true,})
);
  
app.options("*", cors());

const hashContrasenia = async (contrasenia) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(contrasenia, salt);
};

const compararContrasenia = async (ingresada, hashContrasenia) => {
    return await bcryptjs.compare(ingresada, hashContrasenia);
};

const crearToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
};

const autenticarToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json("Debes iniciar sesión");

    jwt.verify(token, SECRET_KEY, (error, verificado) => {
        if (error){
            return res.status(401).json("Error al autenticar token");
        } 
        req.user = verificado;
        next();
    });
};


// Implementar las rutas necesarias

app.post("/registro", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "Debe completar todos los campos" });
        }

        if (users.some(user => user.email === email)) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado" });
        }

        const contraEncriptada = await hashContrasenia(password);
        const nuevoUsuario = { id: Date.now(), email, password: contraEncriptada, firstName, lastName };
        users.push(nuevoUsuario);

        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = users.find(user => user.email === email);
        if (!usuario) return res.status(400).json({ message: "No hay una cuenta asociada a ese correo electronico. Intente nuevamente" });

        const contraValida = await compararContrasenia(password, usuario.password);
        if (!contraValida) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = crearToken(usuario);
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "Usuario loggeado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión. Intente nuevamente" });
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token", { path: '/' });
    res.status(200).json("Se cerró la sesión correctamente");
});

app.get("/getinfo", autenticarToken, (req, res) => {
    res.status(200).json(req.user);
});
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
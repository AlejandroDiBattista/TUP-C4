import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const usuarios = [{
    user: "tiagoo",
    email: "tiago200205@gmail.com",
    password: "tiago" //"tiago"
}]


async function login(req, res) {
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" })
    }
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);
    if (!usuarioAResvisar) {
        return res.status(400).send({ status: "Error", message: "Error durante login" })
    }
    const loginCorrecto = await bcryptjs.compare(password, usuarioAResvisar.password);
    if (!loginCorrecto) {
        return res.status(400).send({ status: "Error", message: "Error durante login" })
    }
    const token = jsonwebtoken.sign(
        { user: usuarioAResvisar.user },
        process.env.JWT_SECRET,
        { expiresIn: 86400 });

    const cookieOption = {
        expires: new Date(Date.now() + 86400 * 1000),
        path: "/"
    }
    res.cookie("jwt", token, cookieOption);
    res.send({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
}

async function register(req, res) {
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if (!user || !password || !email) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" })
    }
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);
    if (usuarioAResvisar) {
        return res.status(400).send({ status: "Error", message: "Este usuario ya existe" })
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt);
    const nuevoUsuario = {
        user, email, password: hashPassword
    }
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    return res.status(201).send({ status: "ok", message: `Usuario ${nuevoUsuario.user} agregado`, redirect: "/" })
}



export const methods = {
    login,
    register

}
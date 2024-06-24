import jsonwebtoken from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).send({ status: "Error", message: "Acceso denegado / NO LOGUEADO :d" });
    }

    try {
        const verified = jsonwebtoken.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.user = verified; // Guardar la información del usuario en el objeto req
        next(); // Continuar con la siguiente función middleware o ruta
    } catch (err) {
        return res.status(400).send({ status: "Error", message: "Token no válido" });
    }
}

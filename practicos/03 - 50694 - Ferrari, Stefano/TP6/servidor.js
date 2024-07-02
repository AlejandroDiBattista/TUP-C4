import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {
  comparePassword,
  createToken,
  getUser,
  hasDuplicatedEmail,
  hashPassword,
} from "./services.js";
import { generateId, handleError } from "./utils.js";
import { users } from "./constants.js";
import { authenticateToken } from "./middlewares.js";
import cors from "cors";

const app = express();

app.use(morgan("dev")); // Loggea cada request en consola
app.use(cookieParser()); // Para leer cookies
app.use(express.json()); // Para leer JSONs
app.use(express.static("public")); // Para servir archivos estáticos
app.use(
  cors({
    // origin: "http://127.0.0.1:5500", //Si utiliza la extension Live server, fijarse en que puerto lo corre, a mi por ejemplo en el 5500
    credentials: true,
  })
);

app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email) return handleError(res, "email", "Email is required. Please provide a valid email address.");

    if (!password) return handleError(res, "password", "Password is required. Please provide a secure password.");

    if (password.length < 6) return handleError(res, "password", "Password must be at least 6 characters long.");

    if (hasDuplicatedEmail(email))return handleError(res, "email", "This email address is already registered. Please use a different email.");

    const encryptedPassword = await hashPassword(password);
    const newUser = {
      id: generateId(),
      email,
      password: encryptedPassword,
      firstName,
      lastName,
    };

    users.push(newUser);
    res.status(201).send("User registrered successfully");
  } catch (error) {
    return handleError(res, "general", "An unexpected error occurred. Please try again later.");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return handleError(res, "email", "Email is required. Please provide a valid email address.");
    if (!password) return handleError(res, "password", "Password is required. Please provide a secure password.");

    const user = getUser(email);
    if (!user) return handleError(res, "email", "No account found with that email address.");

    const isEqual = await comparePassword(password, user.password);
    if (!isEqual) return handleError(res, "password", "Incorrect password.");

    const token = createToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).send("User logged in successfully.");
  } catch (error) {
    return handleError(res, "general", "An unexpected error occurred. Please try again later.");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", { path: '/' });
  res.status(200).send("User has been log out.");
});

app.get("/info", authenticateToken, (req, res) => {
  const userInfo = req.user;
  res.status(200).json({ ...userInfo });
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
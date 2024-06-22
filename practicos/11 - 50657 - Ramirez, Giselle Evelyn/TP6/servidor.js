import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import fs from "fs";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));

const readUsers = () => {
  const data = fs.readFileSync("users.json", "utf8");
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users[username]) {
    res.send("User already registered");
  } else {
    users[username] = { password };
    writeUsers(users);
    res.send("Registration successful");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users[username] && users[username].password === password) {
    req.session.user = username;
    res.send("Login successful");
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/info", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out");
    }
    res.redirect("/");
  });
});

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
// Para servir archivos estáticos

// Implementar las rutas necesarias

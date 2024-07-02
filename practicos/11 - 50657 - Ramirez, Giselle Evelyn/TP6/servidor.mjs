import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

let users = []; // Array temporal para almacenar usuarios

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send('User registered successfully');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.send('Login successful');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/info', (req, res) => {
  // Simulando un usuario autenticado
  const user = users[0];
  if (user) {
    res.json({ user: user.username });
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

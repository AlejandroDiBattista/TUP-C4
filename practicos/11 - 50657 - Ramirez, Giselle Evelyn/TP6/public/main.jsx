const { useState } = React;
const { Button, TextField, Container, Typography, Box, CssBaseline } = MaterialUI;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [info, setInfo] = useState(null);

  const handleRegister = async () => {
    try {
      await axios.post('/register', { username, password });
      alert('User registered successfully');
    } catch (error) {
      alert(error.toString());
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { username, password });
      if (response.data === 'Login successful') {
        setIsLoggedIn(true);
        alert('Login successful');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setInfo(null);
    alert('Logged out successfully');
  };

  const fetchInfo = async () => {
    try {
      const response = await axios.get('/info');
      setInfo(response.data.user);
    } catch (error) {
      alert('Error fetching info or unauthorized');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Gestión de Sesión
        </Typography>

        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
          <Typography component="h2" variant="h6">
            Register
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Typography component="h2" variant="h6">
            Login
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          {isLoggedIn && (
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={fetchInfo}
                sx={{ mt: 3, mb: 2 }}
              >
                Get Info
              </Button>
              {info && <Typography>Logged in as: {info}</Typography>}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ mt: 3, mb: 2 }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

// ReactDOM.render(<App />, document.getElementById('root'));

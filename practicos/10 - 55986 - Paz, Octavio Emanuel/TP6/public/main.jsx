const { useState } = React;
const { Button, TextField, Typography, Container, Box, Card, CardContent} = MaterialUI;

const App = () => {
  const [logueado, setLogueado] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [info, setInfo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarForm, setMostrarForm] = useState('login'); // Mostrar formulario de login por defecto

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:3000/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña })
      });
      const data = await res.json();
      if (data.exito) {
        setMensaje('¡Registrado exitosamente!');
        setMostrarForm('login'); // Cambiar al formulario de login tras registro exitoso
      } else {
        setMensaje(data.mensaje || '¡Fallo en el registro!');
      }
    } catch (err) {
      console.error('Error en registrar:', err);
      setMensaje('¡Error en el servidor!');
    }
  };
  
  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.exito) {
        setLogueado(true);
        setUsuario(usuario);
        setMensaje('');
      } else {
        setMensaje(data.mensaje || '¡Fallo en el inicio de sesión!');
      }
      console.log('Respuesta de login:', data);
    } catch (err) {
      console.error('Error en login:', err);
      setMensaje('¡Error en el servidor!');
    }
  };
  
  const manejarLogout = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.exito) {
        setLogueado(false);
        setUsuario('');
        setInfo('');
        setMensaje('');
        setMostrarContraseña(false);
      }
    } catch (err) {
      console.error('Error en logout:', err);
      setMensaje('¡Error en el servidor!');
    }
  };
  
  const manejarObtenerInfo = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/api/info', { credentials: 'include' });
      const data = await res.json();
      if (data.info) {
        setInfo(data.info);
        setMostrarContraseña(logueado);
      } else {
        setMensaje(data.mensaje || 'Error al obtener información');
      }
      console.log('Información recibida:', data);
    } catch (err) {
      console.error('Error en obtener información:', err);
      setMensaje('¡Error en el servidor!');
    }
  };

  const mostrarFormulario = (tipo) => {
    setMostrarForm(tipo);
    setMensaje('');
  };

  return (
    <Container >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {!logueado ? (
          <div>
            {mostrarForm === 'login' && (
              <Card>
                <CardContent>
                  <Box textAlign="center">
                    <Typography variant="h5">Iniciar Sesión</Typography>
                    <form onSubmit={manejarLogin}>
                      <TextField
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        type="password"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <Button type="submit" variant="contained" color="primary">Iniciar Sesión</Button>
                    </form>
                    <Typography>
                      ¿No tienes una cuenta?
                      <Button color="primary" onClick={() => mostrarFormulario('register')}>Regístrate aquí</Button>
                    </Typography>
                    {mensaje && <Typography color="error">{mensaje}</Typography>}
                  </Box>
                </CardContent>
              </Card>
            )}

            {mostrarForm === 'register' && (
              <Card style={{ backgroundColor: '#bbffae' }}>
                <CardContent>
                  <Box textAlign="center">
                    <Typography variant="h5">Registrar</Typography>
                    <form onSubmit={manejarRegistro}>
                      <TextField
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        type="password"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <Button type="submit" variant="contained" color="primary">Registrar</Button>
                    </form>
                    <Typography>
                      ¿Ya tienes una cuenta?
                      <Button color="primary" onClick={() => mostrarFormulario('login')}>Inicia sesión aquí</Button>
                    </Typography>
                    {mensaje && <Typography color="error">{mensaje}</Typography>}
                  </Box>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardContent >
              <Typography variant="h5">Bienvenido, {usuario}</Typography>
              <Button variant="contained" color="secondary" onClick={manejarLogout}>Cerrar Sesión</Button>
              <Button variant="contained" color="primary" onClick={manejarObtenerInfo}>Obtener Información</Button>
              <div>
                {info && (
                  <Typography textAlign="center" >
                    {mostrarContraseña && <span><b> Su contraseña es: "{contraseña}"</b></span>}
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};
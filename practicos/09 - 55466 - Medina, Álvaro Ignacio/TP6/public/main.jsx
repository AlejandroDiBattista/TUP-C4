const { useState } = React;
const { Button, TextField, Typography, Container, Box, Card, CardContent } = MaterialUI;

const App = () => {
  const [logueado, setLogueado] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [info, setInfo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarUsuario, setMostrarUsuario] = useState(false);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarForm, setMostrarForm] = useState('login'); // Mostrar formulario de login por defecto

  const manejarRegistro = (e) => {
    e.preventDefault();
    fetch('/api/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contraseña })
    }).then(res => res.json())
      .then(data => {
        if (data.exito) {
          setMensaje('¡Fue registrado correctamente!');
          setMostrarForm('login'); // Cambiar al formulario de login tras registro exitoso
        } else {
          setMensaje(data.mensaje || '¡Hubo un error en el registro!');
        }
      })
      .catch(err => console.error('Error en registrar:', err));
  };

  const manejarLogin = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contraseña }),
      credentials: 'include'
    }).then(res => res.json())
      .then(data => {
        if (data.exito) {
          setLogueado(true);
          setUsuario(usuario); // Actualiza el usuario aquí
          setMensaje('');
        } else {
          setMensaje('¡Hubo un error en el inicio de sesión!');
        }
        console.log('Respuesta de login:', data);
      })
      .catch(err => console.error('Error en login:', err));
  };

  const manejarLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
      .then(data => {
        if (data.exito) {
          setLogueado(false);
          setUsuario(''); // Limpia el usuario aquí
          setInfo('');
          setMensaje('');
          setMostrarContraseña(false);
        }
      })
      .catch(err => console.error('Error en logout:', err));
  };

  const manejarObtenerInfo = () => {
    fetch('/api/info', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.info) {
          setInfo(data.info);
          setMostrarContraseña(logueado);
        } else {
          setMensaje(data.mensaje || 'Hubo un error al obtener información');
        }
        console.log('La información se recibió correctamente:', data);
      })
      .catch(err => console.error('Error en obtener información:', err));
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
                    <Typography variant="h5">INICIAR SESIÓN</Typography>
                    <form onSubmit={manejarLogin}>
                      <TextField
                        type="text" placeholder="Ingrese su usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} variant="outlined" fullWidth margin="normal"
                      />

                      <TextField
                        type="password" placeholder="Ingrese su contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} variant="outlined" fullWidth margin="normal"
                      />

                      <Button type="submit" variant="contained" color="success">Iniciar Sesión</Button>
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
              <Card>
                <CardContent>
                  <Box textAlign="center">
                    <Typography variant="h5">REGISTRO DE USUARIO</Typography>
                    <form onSubmit={manejarRegistro}>
                      <TextField
                        type="text" placeholder="Cree un usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} variant="outlined" fullWidth margin="normal"
                      />
                      <TextField
                        type="password" placeholder="Cree una contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} variant="outlined" fullWidth margin="normal"
                      />
                      <Button type="submit" variant="contained" color="success">Registrar</Button>
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
          <Box textAlign="center" >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <Typography variant="h5">¡BIENVENIDO, {usuario}!</Typography>
              <br />
              <Button variant="contained" size = "large"color="error" onClick={manejarLogout}>Cerrar Sesión</Button> <br /><br />
              <Button variant="contained" size="large" color="primary" onClick={manejarObtenerInfo}>Obtener Información</Button>
              <div><br />
                {info && (
                  <Typography>
                    {mostrarContraseña && <span>CONTRASEÑA: "{contraseña}"</span>}
                  </Typography>
                )}
              </div>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};
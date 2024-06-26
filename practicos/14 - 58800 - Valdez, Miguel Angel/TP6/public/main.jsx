const { useState } = React;
const { Button, Form, Container, Card } = ReactBootstrap;

const App = () => {
    const [logueado, setLogueado] = useState(false);
    const [usuarioLogin, setUsuarioLogin] = useState('');
    const [contraseñaLogin, setContraseñaLogin] = useState('');
    const [usuarioRegistro, setUsuarioRegistro] = useState('');
    const [contraseñaRegistro, setContraseñaRegistro] = useState('');
    const [info, setInfo] = useState('');
    const [mostrarContraseña, setMostrarContraseña] = useState(false); // Estado para mostrar contraseña en la vista
    const [mostrarForm, setMostrarForm] = useState('login'); // Estado para mostrar el formulario activo

    const mostrarAlerta = (mensaje, tipo = 'success') => {
        Swal.fire({
            icon: tipo,
            text: mensaje,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const manejarRegistro = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:3000/api/registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: usuarioRegistro, contraseña: contraseñaRegistro })
        }).then(res => res.json())
            .then(data => {
                if (data.exito) {
                    mostrarAlerta('¡Registrado exitosamente!');
                    setMostrarForm('login'); // Cambiar al formulario de login tras registro exitoso
                } else {
                    mostrarAlerta(data.mensaje || '¡Fallo en el registro!', 'error');
                }
            })
            .catch(err => {
                console.error('Error en registrar:', err);
                mostrarAlerta('¡Error al registrar!', 'error');
            });
    };

    const manejarLogin = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: usuarioLogin, contraseña: contraseñaLogin }),
            credentials: 'include'  // Importante para enviar cookies
        }).then(res => res.json())
            .then(data => {
                if (data.exito) {
                    setLogueado(true);
                    mostrarAlerta('¡Inicio de sesión exitoso!');
                } else {
                    mostrarAlerta('¡Fallo en el inicio de sesión!', 'error');
                }
            })
            .catch(err => {
                console.error('Error en login:', err);
                mostrarAlerta('¡Error al iniciar sesión!', 'error');
            });
    };

    const manejarLogout = () => {
        fetch('http://127.0.0.1:3000/api/logout', {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                if (data.exito) {
                    setLogueado(false);
                    setInfo('');
                    mostrarAlerta('¡Cierre de sesión exitoso!');
                }
            })
            .catch(err => {
                console.error('Error en logout:', err);
                mostrarAlerta('¡Error al cerrar sesión!', 'error');
            });
    };

    const manejarObtenerInfo = () => {
        fetch('http://127.0.0.1:3000/api/info', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.info) {
                    console.log('Token JWT:', data.token);  // Asegúrate de que data.token sea la propiedad correcta
                    setInfo(data.info);
                    setMostrarContraseña(logueado);
                    mostrarAlerta('¡Información obtenida correctamente!');
                } else {
                    mostrarAlerta(data.mensaje || 'Error al obtener información', 'error');
                }
            })
            .catch(err => {
                console.error('Error en obtener información:', err);
                mostrarAlerta('¡Error al obtener información!', 'error');
            });
    };

    const mostrarFormulario = (tipo) => {
        setMostrarForm(tipo);
    };

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center vh-100">
                {!logueado ? (
                    <div>
                        {mostrarForm === 'login' && (
                            <Card className="custom-card">
                                <Card.Body className="custom-card-body">
                                    <div className="text-center">
                                        <h5 className="mb-3">Iniciar Sesión</h5>
                                        <Form onSubmit={manejarLogin}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Usuario</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ingrese su usuario"
                                                    value={usuarioLogin}
                                                    onChange={(e) => setUsuarioLogin(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Contraseña"
                                                    value={contraseñaLogin}
                                                    onChange={(e) => setContraseñaLogin(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className="custom-btn-primary">
                                                Iniciar Sesión
                                            </Button>
                                        </Form>
                                        <div className="mt-3">
                                            ¿No tienes una cuenta?{' '}
                                            <Button variant="link" onClick={() => mostrarFormulario('register')} className="custom-btn-link">
                                                Regístrate aquí
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}

                        {mostrarForm === 'register' && (
                            <Card className="custom-card">
                                <Card.Body className="custom-card-body">
                                    <div className="text-center">
                                        <h5 className="mb-3">Registrar</h5>
                                        <Form onSubmit={manejarRegistro}>
                                            <Form.Group controlId="formBasicRegistro">
                                                <Form.Label>Usuario</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Ingrese su usuario"
                                                    value={usuarioRegistro}
                                                    onChange={(e) => setUsuarioRegistro(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPasswordRegistro">
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Contraseña"
                                                    value={contraseñaRegistro}
                                                    onChange={(e) => setContraseñaRegistro(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className="custom-btn-primary">
                                                Registrar
                                            </Button>
                                        </Form>
                                        <div className="mt-3">
                                            ¿Ya tienes una cuenta?{' '}
                                            <Button variant="link" onClick={() => mostrarFormulario('login')} className="custom-btn-link">
                                                Inicia sesión aquí
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <h5>Bienvenido</h5>
                        <Button variant="secondary" className="mr-2 custom-btn-secondary" onClick={manejarLogout}>
                            Cerrar Sesión
                        </Button>
                        <Button variant="primary" className="custom-btn-primary" onClick={manejarObtenerInfo}>
                            Obtener Información
                        </Button>
                        {info && (
                            <p className="mt-3">
                                {info}
                                {mostrarContraseña && <span>Su contraseña es: "{contraseñaLogin}"</span>}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

// Renderizar la aplicación en el elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
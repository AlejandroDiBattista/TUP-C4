function App() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [infoUsuario, setInfoUsuario] = useState(null);
    const [vista, setVista] = useState('registrar');

    
    const manejarLogin = async () => {
        const respuesta = await fetch('/iniciar-sesion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreUsuario, contrasena })
        });
        const datos = await respuesta.json();
        setMensaje(datos.mensaje);
        if (respuesta.status === 200) {
            setInfoUsuario(datos.usuario);
            setVista('info');
        }
    };
    
    const manejarLogout = async () => {
        const respuesta = await fetch('/cerrar-sesion', {
            method: 'POST'
        });
        const datos = await respuesta.json();
        setMensaje(datos.mensaje);
        setInfoUsuario(null);
        setVista('registrar');
    };
    
    const manejarRegistro = async () => {
        const respuesta = await fetch('/registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreUsuario, contrasena, nombre })
        });
        const datos = await respuesta.json();
        setMensaje(datos.mensaje);
        if (respuesta.status === 201) {
            setVista('iniciar-sesion');
        }
    };
    const obtenerInfo = async () => {
        const respuesta = await fetch('/info');
        if (respuesta.ok) {
            const datos = await respuesta.json();
            setInfoUsuario(datos.usuario);
            setVista('info');
        } else {
            setMensaje('No autorizado');
            setVista('registrar');
        }
    };
    
    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {vista === 'registrar' && (
                <div>
                    <h2>Registrarse</h2>
                    <label>
                        Usuario:
                        <input
                            type="text"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </label>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </label>
                    
                    <button onClick={manejarRegistro}>Registrarse</button>
                    <button onClick={() => setVista('iniciar-sesion')}>Iniciar sesión</button>
                </div>
            )}
            {vista === 'iniciar-sesion' && (
                <div>
                    <h2>Iniciar sesión</h2>
                    <label>
                        Usuario:
                        <input
                            type="text"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </label>

                    <button onClick={manejarLogin}>Iniciar sesión</button>
                    <button onClick={() => setVista('registrar')}>Registrarse</button>
                </div>
            )}
            {vista === 'info' && infoUsuario && (
                <div>
                    <h2>Información del Usuario</h2>
                    <p>Usuario: {infoUsuario.nombreUsuario}</p>
                    <p>Nombre: {infoUsuario.nombre}</p>                    
                    <button onClick={manejarLogout}>Cerrar sesión</button>
                </div>
            )}
            <div>
                <p>{mensaje}</p>
            </div>
        </div>
    );
}

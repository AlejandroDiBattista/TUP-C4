function App() {
    const [iniciadoSesion, setIniciadoSesion] = useState(false);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarInicioSesion, setMostrarInicioSesion] = useState(false);

    const manejarInicioSesion = (estado) => {
        setIniciadoSesion(estado);
        if (estado) {
            setMostrarInicioSesion(false);
        }
    };

    return (
        <div className="container">
            <h1>TP6 - Sesiones</h1>
            <div>
                <button onClick={() => { setMostrarRegistro(true); setMostrarInicioSesion(false); }}>
                    Registrate aqui!
                </button>
                <button onClick={() => { setMostrarInicioSesion(true); setMostrarRegistro(false); }}>
                    Iniciar sesión
                </button>
            </div>
            {mostrarRegistro && <Registro />}
            {mostrarInicioSesion && <InicioSesion setIniciadoSesion={manejarInicioSesion} />}
            {iniciadoSesion && <Info />}
            {iniciadoSesion && <CerrarSesion setIniciadoSesion={setIniciadoSesion} />}
        </div>
    );
}

function Registro() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        const respuesta = await fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: nombreUsuario, password: contrasena }),
        });

        const datos = await respuesta.json();
        setMensaje(datos.message);
        console.log('Respuesta de registro:', datos);
    };

    return (
        <form onSubmit={manejarEnvio}>
            <h2>Registro</h2>
            <label>
                Usuario:
                <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            </label>
            <button type="submit">Registrar</button>
            <p className={`mensaje ${mensaje.includes('exitosamente') ? 'exito' : 'error'}`}>{mensaje}</p>
        </form>
    );
}

function InicioSesion({ setIniciadoSesion }) {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        const respuesta = await fetch('/ingreso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: nombreUsuario, password: contrasena }),
        });

        const datos = await respuesta.json();
        setMensaje(datos.message);
        console.log('Respuesta de inicio de sesión:', datos);
        if (respuesta.ok) {
            setIniciadoSesion(true);
        }
    };

    return (
        <form onSubmit={manejarEnvio}>
            <h2>Inicio de Sesión</h2>
            <label>
                Usuario:
                <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            </label>
            <button type="submit">Iniciar Sesión</button>
            <p className={`mensaje ${mensaje.includes('exitoso') ? 'exito' : 'error'}`}>{mensaje}</p>
        </form>
    );
}

function CerrarSesion({ setIniciadoSesion }) {
    const [mensaje, setMensaje] = useState('');

    const manejarCierreSesion = async () => {
        const respuesta = await fetch('/cerrarsesion', {
            method: 'POST',
        });

        const datos = await respuesta.json();
        setMensaje(datos.message);
        console.log('Cerraron sesión:', datos);
        setIniciadoSesion(false);
    };

    return (
        <div>
            <button onClick={manejarCierreSesion}>Cerrar Sesión</button>
            <p className="efectuado">{mensaje}</p>
        </div>
    );
}

function Info() {
    const [info, setInfo] = useState('');

    useEffect(() => {
        const obtenerInfo = async () => {
            const respuesta = await fetch('/info');
            const datos = await respuesta.json();
            setInfo(datos.message);
            console.log('Respuesta:', datos);
        };

        obtenerInfo();
    }, []);

    return (
        <div className="info">
            <h2>Info</h2>
            <p>{info}</p>
        </div>
    );
}
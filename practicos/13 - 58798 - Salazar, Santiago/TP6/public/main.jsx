function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [view, setView] = useState('inicio');

    const handleRegister = async () => {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, mail})
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.status === 201) {
            setView('login');
        }
    };

    const handleLogin = async () => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.status === 200) {
            setUserInfo(data.user);
            setView('info');
        }
    };

    const handleLogout = async () => {
        const response = await fetch('/logout', {
            method: 'POST'
        });
        const data = await response.json();
        setMessage(data.message);
        setUserInfo(null);
        setView('login');
    };

    const fetchInfo = async () => {
        const response = await fetch('/info');
        if (response.ok) {
            const data = await response.json();
            setUserInfo(data.user);
            setView('info');
        } else {
            setMessage('No autorizado');
            setView('register');
        }
    };

    return (
        <div>
            <div className='wrapper'>
                {view === 'inicio' && (
                    <div>
                        <h1>¡Bienvenido!</h1>
                    <button onClick={() => setView('login')}>Iniciar Sesión</button>
                    <p></p>
                    <button onClick={() => setView('register')}>Registro</button>
                    </div>
                )}
            {view === 'register' && (
                <div>
                    <h1>Registrar</h1>
                    <label>
                        <input className="input-box"
                            placeholder="Usuario"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <input className="input-box"
                            placeholder="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <input className="input-box"
                            placeholder="Correo Electronico"
                            type="text"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </label>
                    <button onClick={handleRegister}>Registrar</button>
                    <p></p>
                    <button onClick={() => setView('login')}>Iniciar Sesión</button>
                </div>
            )}
            {view === 'login' && (
                <div>
                    <h1>Iniciar Sesión</h1>
                    <label>
                        <input className="input-box"
                            placeholder="Usuario"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <input className="input-box"
                            placeholder="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button onClick={handleLogin}>Entrar</button>
                    <p></p>
                    <button onClick={() => setView('register')}>Registro</button>
                </div>
            )}
            {view === 'info' && userInfo && (
                <div>
                    <h2>Información del Usuario</h2>
                    <p>Usuario: {userInfo.username}</p>
                    <p>Correo Electronico: {userInfo.mail}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            )}
            <div>
                <p>{message}</p>
            </div>
        </div>
        </div>
    );
}
function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [view, setView] = useState('register');

    const handleRegister = async () => {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, name })
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
        setView('register');
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
            <h1>TP6 - Sesiones</h1>
            {view === 'register' && (
                <div>
                    <h2>Registrarse</h2>
                    <label>
                        Usuario:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    
                    <button onClick={handleRegister}>Registrarse</button>
                    <button onClick={() => setView('login')}>Login</button>
                </div>
            )}
            {view === 'login' && (
                <div>
                    <h2>Login</h2>
                    <label>
                        Usuario
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Contraseña
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => setView('register')}>Registrarse</button>
                </div>
            )}
            {view === 'info' && userInfo && (
                <div>
                    <h2>Información del Usuario</h2>
                    <p>Usuario: {userInfo.username}</p>
                    <p>Nombre: {userInfo.name}</p>                    
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <div>
                <p>{message}</p>
            </div>
        </div>
    );
}
const { useState } = React;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    const handleLogin = (username, password) => {
        // Verificar si el usuario y contraseña son correctos
        const foundUser = users.find(u => u.username === username && u.password === password);
        if (foundUser) {
            setIsLoggedIn(true);
            setUser({ username });
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    const handleRegister = (username, password) => {
        // Verificar si el usuario ya existe
        const userExists = users.some(u => u.username === username);
        if (userExists) {
            alert("El usuario ya existe");
        } else {
            // Registrar el nuevo usuario
            setUsers([...users, { username, password }]);
            alert("Usuario registrado con éxito");
        }
    };

    return (
        <div>
            <h1>Gestión de Sesiones</h1>
            {!isLoggedIn ? (
                <>
                    <LoginForm onLogin={handleLogin} />
                    <RegisterForm onRegister={handleRegister} />
                </>
            ) : (
                <>
                    <Info user={user} />
                    <LogoutButton onLogout={handleLogout} />
                </>
            )}
        </div>
    );
}

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
    );
}

function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar</h2>
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
            <button type="submit">Registrar</button>
        </form>
    );
}

function LogoutButton({ onLogout }) {
    return <button onClick={onLogout}>Logout</button>;
}

function Info({ user }) {
    return (
        <div>
            <h2>Info</h2>
            <p>Bienvenido, {user.username}!</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

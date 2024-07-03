function App() {
    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            <Registro />
            <Login />
            <Info />
        </div>
    );
}

function Registro() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Registrar</button>
            </form>
        </section>
    );
}

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </section>
    );
}

function Info() {
    return (
        <section>
            <h2>Información Confidencial</h2>
            <p>Esta es la información confidencial.</p>
        </section>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
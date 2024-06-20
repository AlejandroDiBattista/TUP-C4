function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState(null);

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                setIsLoggedIn(true);
                const data = await response.text();
                setUserInfo(data);
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRegister = async (username, password) => {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                alert('Registro exitoso');
                setIsRegistering(false); // Volver al formulario de inicio de sesión después de registrarse
            } else {
                alert('Error al registrar, usuario existente.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST'
            });

            if (response.ok) {
                setIsLoggedIn(false);
                setUserInfo(null);
            } else {
                alert('Error al cerrar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="app">
            {!isLoggedIn ? (
                <div className="auth-container">
                    <div className="card">
                        <h2>{isRegistering ? 'REGISTRARSE' : 'INICIO DE SESIÓN'}</h2>
                        <AuthForm 
                            onSubmit={isRegistering ? handleRegister : handleLogin} 
                            buttonText={isRegistering ? 'Registrarse' : 'Iniciar Sesión'} 
                        />
                        <div className="auth-links">
                            {!isRegistering && <a href="#"></a>}
                            <a href="#" onClick={() => setIsRegistering(!isRegistering)}>
                                {isRegistering ? 'Volver a Iniciar Sesión' : '¿No tienes una cuenta? Registrarse'}
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="protected-info-container">
                    <div className="protected-info">
                        <h2>Bienvenido</h2>
                        <p>{userInfo}</p>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function AuthForm({ onSubmit, buttonText }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-container">
                <label>Correo Electrónico</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Correo Electrónico"
                />
            </div>
            <div className="input-container">
                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
            </div>
            <button type="submit">{buttonText}</button>
        </form>
    );
}

const { useState, useEffect } = React;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

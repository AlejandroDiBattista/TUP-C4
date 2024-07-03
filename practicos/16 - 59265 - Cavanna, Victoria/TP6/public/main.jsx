const { useState } = React

const App = () => {
    const [autenticado, setAutenticado] = useState(false);
    const [page, setPage] = useState("inicio");
    const paginas = {
        "inicio": <Inicio setPage={setPage} autenticado={autenticado} />,
        "login": <Login setPage={setPage} setAutenticado={setAutenticado} />,
        "registro": <Registro setPage={setPage} />,
        "informacion": <Informacion setPage={setPage} />
    }

    return (
        <div className="container">
            <NavBar setPage={setPage} autenticado={autenticado} setAutenticado={setAutenticado} />
            {paginas[page] || <Inicio setPage={setPage} />}
        </div>
    );
};
const NavBar = ({ setPage, autenticado, setAutenticado }) => {
    const handleLogout = async () => {
        try {
            const response = await fetch("/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.status === 200) {
                setAutenticado(false);
                setPage("inicio")
            }
        } catch (error) {
            console.error("Error al salir de sesión:", error);
        }
    };
    const renderBotones = () => {
        if (autenticado) {
            return <li><button className="contrast" onClick={handleLogout}>Cerrar sesión</button></li>;
        } else {
            return (
                <>
                    <li><button className="outline contrast" onClick={() => setPage("registro")}>Registrarse</button></li>
                    <li><button className="contrast" onClick={() => setPage("login")}>Iniciar sesión</button></li>
                </>
            );
        }
    };

    return (

        <nav>
            <ul>
                <li><a onClick={() => setPage("inicio")} className="nav-brand"><strong>Gestión de sesiones</strong></a></li>
            </ul>
            <ul className="nav-items">
                <li><a onClick={() => setPage("inicio")}>Inicio</a></li>
                <li><a onClick={() => setPage("informacion")}>Información</a></li>
                {renderBotones()}
            </ul>
        </nav>

    );
};

const Inicio = ({ setPage, autenticado }) => {
    const renderBotones = () => {
        if (autenticado) {
            return(
                <button className="contrast" onClick={() => setPage("informacion")}>Ver informacion</button>
            )
        } else {
            return (
                <div className="actions-wrapp">
                    <button className="contrast" onClick={() => setPage("login")}>Iniciar sesión</button>
                    <button className="outline contrast" onClick={() => setPage("registro")}>Registrarse</button>
                </div>
            )
        }

    }
    return (
        <section className="container">
            <h1>Página principal</h1>
            <h4>Acciones posibles</h4>
            {renderBotones()}
        </section>
    )
}


const Login = ({ setPage, setAutenticado }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const result = await response.json();

            if (response.status === 201) {
                setAutenticado(true);
                setPage("informacion");
            } else if (response.status === 400) {
                setError(result.message);
            } else {
                throw new Error("Error inesperado del servidor");
            }
        } catch (err) {
            setError(err.message || "Error al iniciar sesión. Intente nuevamente.");
        } 
    };

    return (
        <div className="container">
            <h1 className="title">Iniciar Sesión</h1>
            <form onSubmit={handleLogin} className="form-login">
                <div className="field">
                    <label className="label">Correo electrónico</label>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        required
                    />
                </div>
                <div className="field">
                    <label className="label">Contraseña</label>
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <div className="field">
                    <button className="button btn-form" type="submit">
                        Iniciar sesión
                    </button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};
const Registro = ({ setPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const handleRegistro = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            if (response.status === 201) {
                setPage("login");
            } else if (response.status === 400) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Error al registrarse");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Registrarse</h1>
            <form className="form-register" onSubmit={handleRegistro}>
                <div className="field">
                    <label className="label">Nombre</label>
                    <input
                        className="input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div className="field">
                    <label className="label">Apellido</label>
                    <input
                        className="input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Apellido"
                        required
                    />
                </div>
                <div className="field">
                    <label className="label">Correo electrónico</label>
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        required
                    />
                </div>
                <div className="field">
                    <label className="label">Contraseña</label>
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <div className="field">
                    <button className="button btn-form" type="submit">
                        Registrarse
                    </button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};



const Informacion = ({ setPage }) => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState("");
    const [reqAuth, setReqAuth] = useState(false);

    const handleGetInfo = async () => {
        try {
            const response = await fetch("/getinfo", {
                credentials: 'include',
            });

            if (response.status === 403 || response.status === 401) {
                setReqAuth(true);
            } else if (response.status === 200) {
                const data = await response.json();
                setInfo(data);
            } else {
                throw new Error("Error inesperado del servidor");
            }
        } catch (err) {
            const errorResponse = err.message || "Error de red";
            setError(errorResponse);
        }
    };

    useEffect(() => {
        handleGetInfo();
        return () => {
            setInfo(null);
        };
    }, [setPage]);

    return (
        <>
            {reqAuth && (
                <dialog open>
                    <article>
                        <header>
                            <button aria-label="Close" rel="prev" onClick={() => setPage("inicio")}></button>
                            <h2>Debe iniciar sesión para ver esta página</h2>
                        </header>
                        <footer>
                            <button className="outline contrast" onClick={() => setPage("registro")}>
                                Registrarse
                            </button>
                            <button className="contrast" onClick={() => setPage("login")}>
                                Iniciar Sesión
                            </button>
                        </footer>
                    </article>
                </dialog>
            )}
            {error && <p className="error-message">{error}</p>}
            {info && (
                <div>
                    <h2>Información</h2>
                    <h4>Nombre: {info.firstName}</h4>
                    <h4>Apellido: {info.lastName}</h4>
                    <h4>Correo Electrónico: {info.email}</h4>
                </div>
            )}
        </>
    );
};
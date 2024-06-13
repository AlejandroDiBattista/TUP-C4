
function App() {
    let [mensaje, setMensaje] = React.useState('Hola Mundo')

    return (
        <div>
            <h1>Session</h1>
            <button onClick={listar}>Listar Usuarios</button>
            <button onClick={registrar}>Registrar</button>
            <button onClick={login} >Login</button>
            <button onClick={logout}>Logout</button>
            <button onClick={info}>Ver Info Protegida</button>
            <pre>
                {mensaje}
            </pre>
        </div>
    );
}


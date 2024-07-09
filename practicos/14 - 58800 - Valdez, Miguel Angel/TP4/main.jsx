const API_KEY = '5450abc8f23f2e11b32a01ce9b742266';
const { useState, useEffect } = React;

function App() {
    const [ciudad, setCiudad] = useState("");
    const [datosClima, setDatosClima] = useState(null);
    const [error, setError] = useState(null);
    const [consultaBusqueda, setConsultaBusqueda] = useState("");

    const obtenerDatosClima = async (ciudad) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            const data = await response.json();
            setDatosClima(data);
        } catch (error) {
            setError('Ciudad no encontrada');
        }
    };

    useEffect(() => {
        if (ciudad) {
            obtenerDatosClima(ciudad);
        }
    }, [ciudad]);

    const manejarCambioBusqueda = (event) => {
        setConsultaBusqueda(event.target.value);
    };

    const manejarSubmitBusqueda = (event) => {
        event.preventDefault();
        if (consultaBusqueda) {
            setCiudad(consultaBusqueda);
            setConsultaBusqueda("");
        }
    };

    const manejarClickCiudad = (ciudad) => {
        setCiudad(ciudad);
    };

    return (
        <div className="contenedor">
            <div className="arriba">
                <header className="encabezado">
                    <h1>Clima</h1>
                </header>
                <nav className="enlaces-ciudades">
                    <ul>
                        <li><a href="#" onClick={() => manejarClickCiudad("Tucuman")}>Tucumán</a></li>
                        <li><a href="#" onClick={() => manejarClickCiudad("Salta")}>Salta</a></li>
                        <li><a href="#" onClick={() => manejarClickCiudad("Buenos Aires")}>Buenos Aires</a></li>
                    </ul>
                </nav>
            </div>
            <main>
                <form onSubmit={manejarSubmitBusqueda} className="formulario-busqueda">
                    <div className="contenedor-busqueda">
                        <input 
                            type="text" 
                            placeholder="Buscar ciudad..." 
                            value={consultaBusqueda} 
                            onChange={manejarCambioBusqueda} 
                            className="input-busqueda"
                        />
                    </div>
                </form>
                {error && <div className="error">{error}</div>}
                {datosClima && !error && (
                    <div className="tarjeta-clima">
                        <article>
                            <header className="nombre-ciudad"><strong>{datosClima.name}</strong></header>
                            <img src={`./iconos/${datosClima.weather[0].icon}.svg`} alt="Icono del clima" />
                            <footer>
                                <p className="temperatura-ciudad"><strong>Temperatura: {datosClima.main.temp}°C</strong></p>
                                <p>Temp. Mínima: {datosClima.main.temp_min}°C / Temp. Máxima: {datosClima.main.temp_max}°C</p>
                                <p>Humedad: {datosClima.main.humidity}%</p>
                            </footer>
                        </article>
                    </div>
                )}
            </main>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

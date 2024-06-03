const { useState, useEffect } = React;

const API_KEY = '30d38b26954359266708f92e1317dac0'
const URL = "https://api.openweathermap.org/data/2.5/weather";
const ciudades = ["Tucuman", "Salta", "Buenos Aires"];

// Componente NAV
const NavBar = ({ ciudades, ciudadClick }) => {
    return (
        <nav>
            <h2 className="tituloClima">Clima</h2>
            <ul className="ulContenedor">
                {ciudades.map((ciudadNombre) => (
                    <li className="liCiudades" key={ciudadNombre} onClick={() => ciudadClick(ciudadNombre)}>
                        {ciudadNombre}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

// Componente BarraBuscador
const BarraBuscador = ({ actualizarCiudad }) => {
    const [inputValor, setInputValor] = useState("");

    const cambioInput = (e) => {
        setInputValor(e.target.value);
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        actualizarCiudad(inputValor);
        setInputValor("");
    };

    return (
        <form className="buscarContenedor" onSubmit={manejarEnvio} >
            <input 
                className="buscarCiudad"
                type="search"
                name="search"
                placeholder="Buscar ciudad"
                value={inputValor}
                onChange={cambioInput}
            />
        </form>
    )
}

// Conente Card
const CardClima = ({ datosClima }) => {
    return (
        <div className="cardContenedor">
            <article className="cardClima">
                <header className="cardHeader">
                    <h2 className="h2Card">{datosClima.name}</h2>
                </header>
                <div className="contenedorImgCard">
                    <img className="iconoImg" src={obtenerIconoClima(datosClima.weather[0].icon)} alt={datosClima.weather[0].description} />
                </div>
                <footer className="cardFooter">
                    <h3 className="h3Card">Temperatura: {datosClima.main.temp}°C</h3>
                    <p className="pCard">Mínima: {datosClima.main.temp_min}°C / Máxima: {datosClima.main.temp_max}°C</p>
                    <p className="pCard">Humedad: {datosClima.main.humidity}%</p>
                </footer>
            </article>
        </div>
    );
};
const obtenerIconoClima = (icon) => {
    return `./iconos/${icon}.svg`;
};


const App = () => {
    const [ciudad, setCiudad] = useState('Tucumán');
    const [datosClima, setdatosClima] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {buscarClima(ciudad)}, [ciudad]);

    const buscarClima = async (ciudadNombre) => {
        try {
            const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudadNombre}&appid=${API_KEY}&units=metric`);
            if (!respuesta.ok) {
                throw new Error('Ciudad no encontrada');
            }
            const datos = await respuesta.json();
            setdatosClima(datos);
            setError(null)
        }
        catch (error) {
            setError(error.message);
            setdatosClima(null)
        }
    };

    const actualizarCiudad = (ciudadNombre) => {
        setCiudad(ciudadNombre);
    };

    const ciudadClick = (ciudadNombre) => {
        setCiudad(ciudadNombre);
    };

    return (
        <div className="contenedor">
            <NavBar ciudades={ciudades} ciudadClick={ciudadClick} />

            <div className="contenedorSearchyCard">
                <BarraBuscador actualizarCiudad={actualizarCiudad} />
                {error ? (
                <span className="error">{error}</span>
                ) : (
                    datosClima && <CardClima datosClima={datosClima} />
                )}
            </div>

        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
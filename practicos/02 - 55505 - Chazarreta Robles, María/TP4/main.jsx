function Aplicacion() {
    const [ciudad, setCiudad] = React.useState('Miami Beach');
    const [clima, setClima] = React.useState(null);
    
    const obtenerClima = (ciudad) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}&lang=es`)
        .then(response => response.json())
        .then(data => {
            const datosClima = {
                ciudad: data.name,
                temperatura: data.main.temp,
                tempMinima: data.main.temp_min,
                tempMaxima: data.main.temp_max,
                humedad: data.main.humidity,
                icono: data.weather[0].icon
            };
            setClima(datosClima);
        })
        .catch(error => console.error('Error al obtener datos del clima:', error));
    };
    
    React.useEffect(() => {
        obtenerClima(ciudad);
    }, [ciudad]);
    
    return (
        <div>
            <BarraNavegacion setCiudad={setCiudad} />
            <BarraBusqueda setCiudad={setCiudad} />
            {clima && <TarjetaClima {...clima} />}
        </div>
    );
}

function BarraNavegacion({ setCiudad }) {
    return (
        <nav className="nav">
            <ul>
                <li><h3>Clima</h3></li>
            </ul>
            <ul>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Tucumán')}>Tucumán</a></li>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Salta')}>Salta</a></li>
                <li><a href="#" className="ciudades" onClick={() => setCiudad('Buenos Aires')}>Buenos Aires</a></li>
            </ul>
        </nav>
    );
}

function BarraBusqueda({ setCiudad }) {
    const [valorInput, setValorInput] = React.useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (valorInput) {
            setCiudad(valorInput);
        }
    };
    
    return (
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type="search"
                    name="search"
                    placeholder="Buscar"
                    aria-label="Buscar"
                    value={valorInput}
                    onChange={(e) => setValorInput(e.target.value)}
                    />
            </form>
        </div>
    );
}

function TarjetaClima({ ciudad, temperatura, tempMinima, tempMaxima, humedad, icono }) {
    return (
        <article className="tiempo">
            <header className="nombre-ciudad">{ciudad}</header>
            <img className="tiempo2" src={`openweathermap/${icono}.svg`} alt="Icono del clima" />
            <footer className="footer">
            <h2>Temperatura: {temperatura.toFixed(2)}°C</h2>
            <p>Mínima: {tempMinima.toFixed(2)}°C / Máxima: {tempMaxima.toFixed(2)}°C</p>
            <p>Humedad: {humedad}%</p>
            </footer>
        </article>
    );
}

const apiKey = '96a6c7bef9c6bec734b8f22986be17b5';
const raiz = ReactDOM.createRoot(document.getElementById('root'));
raiz.render(<Aplicacion />);
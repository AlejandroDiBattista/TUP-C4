
const API_KEY = '30d38b26954359266708f92e1317dac0'
const URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const CIUDADES_BASE = ["Tucumán", "Salta", "Buenos Aires"];

const Navbar = ({ buscarClima }) => {
    return (
        <nav>
            <ul>
                <li>
                    <h1 className="titulo">Clima</h1>
                </li>
            </ul>
            <ul>
                {CIUDADES_BASE.map((ciudad, index) => (
                    <li key={index} onClick={() => buscarClima(ciudad)}><a href="#">{ciudad}</a></li>
                ))}
            </ul>
        </nav>
    );
}
const BarraBusqueda = ({ buscarClima }) => {
    const [campo, setCampo] = useState("");

    const cambioCampo = (e) => {
        setCampo(e.target.value);
    }

    const buscar = (e) => {
        e.preventDefault();
        buscarClima(campo);
        setCampo("");
    }

    return (
        <form onSubmit={buscar} className="barra-busqueda-form">
            <input
                type="search"
                name="search"
                placeholder="Buscar ciudad"
                aria-label="Search"
                onChange={cambioCampo}
                value={campo}
                className="barra-busqueda"
            />
        </form>
    )
}
const Card = ({ datosCiudad }) => {
    const buscarIcon = (icon) => {
        return `./icons/${icon}.svg`;
    }
    return (
        <article className="card">
            <header className="card-header">
                <h2 className="text-black">{datosCiudad.name}</h2>
            </header>
            <img
                src={buscarIcon(datosCiudad.weather[0].icon)}
                alt={datosCiudad.weather[0].description}
                className="bg-blanco"
            />
            <footer className="card-footer">
                <h3 className="text-black">Temperatura: {datosCiudad.main.temp}°C</h3>
                <p className="text-black">
                    Mínima: {datosCiudad.main.temp_min}°C / Máxima: {datosCiudad.main.temp_max}°C
                </p>
                <p className="text-black">Humedad: {datosCiudad.main.humidity}</p>
            </footer>
        </article>
    )
}



function App() {
    const [datos, setDatos] = useState(null);
    const [ciudad, setCiudad] = useState('Tucuman');
    const [error, setError] = useState(null);

    useEffect(() => {
        buscarClima(ciudad);
    }, []);


    const actualizarDatos = (datos) => {
        setDatos(datos);
        setError(null)
    }

    const buscarClima = async (ciudad) => {
        try {
            const respuesta = await fetch(URL + ciudad + '&appid=' + API_KEY + '&units=metric&lang=es');
            if(respuesta.status === 404){
                throw new Error('Ciudad no encontrada');
            }
            const datosCiudad = await respuesta.json();
            actualizarDatos(datosCiudad)
        } catch (e) {
           setError('Ciudad no encontrada');
           setDatos(null);
        }
    }

    return (
        <>
            <div className="container">
                <Navbar buscarClima={buscarClima} />
                <BarraBusqueda buscarClima={buscarClima} />
                {error && <h3 className="text-black">{error}</h3>}
                {datos && <Card datosCiudad={datos} />}
            </div>
        </>
    )
} 
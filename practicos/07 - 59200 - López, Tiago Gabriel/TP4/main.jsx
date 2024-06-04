const {useState} = React;

const API_KEY = '30d38b26954359266708f92e1317dac0'
const URL = "https://api.openweathermap.org/data/2.5/weather"
const OG_CITIES = ["Tucuman", "Salta", "Buenos Aires"]

function App() {
    const [nombreCiudad, setNombreCiudad] = useState("");
    const [datosClima, setDatosClima] = useState(null);
    const [loadingState, setloadingState] = useState(false);
    const [error, setError] = useState("");

    const hasError = error.length > 0;

    const getClima = async (city) => {
        setloadingState(true);
        setDatosClima(null)
        setError("");

    const consulta = new URLSearchParams({
        q: city.trim(),
        units: "metric",
        appid: API_KEY,
        lang: "es",
    }).toString();


    try {
        const respuesta = await fetch(`${URL}?${consulta}`);

        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                setError("Ciudad No Encontrada");
            } else {
                setError("Error al obtener datos climaticos de la ciudad");
            }
            return;
        }
        
        const data = await respuesta.json();
        setDatosClima(data);
    } catch (err) {
        setError("Error al obtener datos climaticos");
    } finally {
        setloadingState(false);
    }

    
    
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        getClima(nombreCiudad);
    };

    return (
        <div className="container">
            <Navbar getClima={getClima} />
            <main>
               <form role="search" onSubmit={handleSubmit}>
                <input 
                type="search"
                value={nombreCiudad}
                onChange={(e) => setNombreCiudad(e.target.value)}
                placeholder="Buscar Ciudad"
                aria-label="Search"
                aria-describedby="search-helper"
                
                required
               />
             {hasError && <MensajeError error={error}/>}
               </form>
               {loadingState && <Cargando />}
               {datosClima && !hasError && <Tarjeta data={datosClima}/>}
            </main>
        </div>
    );
} 

const Navbar = ({getClima}) => (
    <nav>
        <h1>Clima</h1>
        <ul>
            {["Tucuman", "Salta", "Buenos Aires"].map((nombreCiudad) => (
                <li key={nombreCiudad}>
                    <a href="#" onClick={() => getClima(nombreCiudad)}>
                        {nombreCiudad}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);


//Error para acomodar Invalid-Search
const MensajeError = ({error}) => (
    <div>
    <small className="error" id="invalid-search">  
     <b>{error}</b>
    </small>
    </div>
);


const Cargando = () => <article aria-busy={true}></article>

const Tarjeta = ({data}) => (
    <article>
        <header>
            <h2>{data.name}</h2>
        </header>

        <img 
        src={`./iconos/${data.weather[0].icon}.svg`}
        alt={data.weather[0].description} 
        />

        <footer>
            <h3>Temperatura: {data.main.temp}°C</h3>
            <p>
                Minima: {data.main.temp_min}°C / Maxima: {data.main.temp_max}°C
            </p>
            <p>
                Humedad: {data.main.humidity}%
            </p>
        </footer>
    </article>
);


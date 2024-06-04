const {useState} = React;

const API_KEY = '30d38b26954359266708f92e1317dac0'
const UrlApi = "https://api.openweathermap.org/data/2.5/weather"
const OG_CITIES = ["Tucuman", "Salta", "Buenos Aires"]

function App() {
    const [cityName, setcityName] = useState("");
    const [weatherData, setweatherData] = useState(null);
    const [loadingState, setloadingState] = useState(false);
    const [error, setError] = useState("");

    const hasError = error.length > 0;

    const getWeather = async (city) => {
        setloadingState(true);
        setweatherData(null)
        setError("");

    const consulta = new URLSearchParams({
        q: city.trim(),
        units: "metric",
        appid: API_KEY,
        lang: "es",
    }).toString();


    try {
        const response = await fetch(`${UrlApi}?${consulta}`);

        if (!response.ok) {
            if (response.status === 404) {
                setError("Ciudad No Encontrada");
            } else {
                setError("Error al obtener datos Weatherticos de la ciudad");
            }
            return;
        }
        
        const data = await response.json();
        setweatherData(data);
    } catch (err) {
        setError("Error al obtener datos Weatherticos");
    } finally {
        setloadingState(false);
    }

    
    
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        getWeather(cityName);
    };

    return (
        <div className="container">
            <Navbar getWeather={getWeather} />
            <main>
               <form role="search" onSubmit={handleSubmit}>
                <input 
                type="search"
                value={cityName}
                onChange={(e) => setcityName(e.target.value)}
                placeholder="Buscar Ciudad"
                aria-label="Search"
                aria-describedby="search-helper"
                
                required
               />
             {hasError && <MensajeError error={error}/>}
               </form>
               {loadingState && <Cargando />}
               {weatherData && !hasError && <Tarjeta data={weatherData}/>}
            </main>
        </div>
    );
} 

const Navbar = ({getWeather}) => (
    <nav>
        <h1>Clima</h1>
        <ul>
            {["Tucuman", "Salta", "Buenos Aires"].map((cityName) => (
                <li key={cityName}>
                    <a href="#" onClick={() => getWeather(cityName)}>
                        {cityName}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

const MensajeError = ({error}) => (

    <small className="error" id="invalid-search">  
     <b>{error}</b>
    </small>
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
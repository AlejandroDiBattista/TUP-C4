const { useState } = React;

const API_KEY = "30d38b26954359266708f92e1317dac0";
const DEFAULT_CITIES = ["Tucumán", "Salta", "Buenos Aires"];
const URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasError = error.length > 0;

  const getWeather = async (city) => {
    setIsLoading(true);
    setWeatherData(null);
    setError("");
    try {
      const response = await axios.get(URL, {
        params: {
          q: city.trim(),
          units: "metric",
          appid: API_KEY,
          lang: "es",
        },
      });

      setWeatherData(response.data);
    } catch (err) {
      if (err?.response?.status === 404) {
        setError("Ciudad no encontrada");
      } else {
        setError("Error al obtener los datos del clima");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather(cityName);
  };

  return (
    <div className="container">
      <Navbar getWeather={getWeather} />
      <main>
        <form role="search " onSubmit={handleSubmit}>
          <input
            type="search"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Buscar ciudad"
            aria-label="Search"
            aria-describedby="search-helper"
            aria-invalid={hasError}
            required
          />
          {hasError && <ErrorMessage error={error} />}
        </form>
        {isLoading && <Loader />}
        {weatherData && !hasError && <Card data={weatherData} />}
      </main>
    </div>
  );
}

const Navbar = ({ getWeather }) => (
  <nav>
    <h1>Clima</h1>
    <ul>
      {DEFAULT_CITIES.map((cityName) => (
        <li key={cityName}>
          <a href="#" onClick={() => getWeather(cityName)}>
            {cityName}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const ErrorMessage = ({ error }) => (
  <small className="error" id="search-helper">
    <b>{error}</b>
  </small>
);

const Loader = () => <article aria-busy={true}></article>

const Card = ({ data }) => (
  <article>
    <header>
      <h2>{data.name}</h2>
    </header>

    <img
      src={`./icons/${data.weather[0].icon}.svg`}
      alt={data.weather[0].description}
    />

    <footer>
      <h3>Temperatura: {data.main.temp}°C</h3>
      <p>
        Mínima: {data.main.temp_min}°C / Máxima: {data.main.temp_max}°C
      </p>
      <p>Humedad: {data.main.humidity}%</p>
    </footer>
  </article>
);

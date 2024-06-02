const { useState, useEffect } = React;

const ApiKey = "1586248c3937369faa3442ed8f947769";

const DefaultCity = ["Tucumán", "Salta", "Buenos Aires"];

const UrlApi = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeather] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Estado para el mensaje de error

  useEffect(() => {
    // Cargar datos de Barcelona cuando el componente se monte
    getWeather("Barcelona");
  }, []);

  const Navbar = ({ getWeather }) => (
    <nav>
      <h1>Clima</h1>
      <ul>
        {DefaultCity.map((cityName) => (
          <CityLink
            key={cityName}
            cityName={cityName}
            getWeather={getWeather}
          />
        ))}
      </ul>
    </nav>
  );

  const CityLink = ({ cityName, getWeather }) => (
    <li>
      <a href="#" onClick={() => getWeather(cityName)}>
        {cityName}
      </a>
    </li>
  );

  const getWeather = async (city) => {
    setLoading(true);
    setError(""); // Reiniciar el mensaje de error antes de hacer la solicitud
    try {
      const response = await fetch(
        `${UrlApi}?q=${city.trim()}&units=metric&appid=${ApiKey}&lang=es`
      );
      if (!response.ok) {
        throw new Error("Error al buscar ciudad");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message); // Capturar el error y actualizar el estado del mensaje de error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather(cityName);
  };

  return (
    <div className="container">
      <Navbar getWeather={getWeather} />
      <div className="search-container">
        <form role="search" onSubmit={handleSubmit}>
          <input
            type="search"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Buscar ciudad"
            aria-label="Search"
            aria-describedby="search-helper"
          />
        </form>
      </div>
      <main>
        {isLoading && <Loader />}
        {error && <ErrorMessage error={error} />}{" "}
        {/* Mostrar mensaje de error si hay un error */}
        {weatherData && !error && <Card data={weatherData} />}
      </main>
    </div>
  );
}

const Card = ({ data }) => (
  <article className="card">
    <header>
      <h2>{data.name}</h2>
    </header>

    <div className="imgCard">
      <img
        src={`./openweathermap/${data.weather[0].icon}.svg`}
        alt={data.weather[0].description}
      />
    </div>

    <footer>
      <h3>Temperatura: {data.main.temp}°C</h3>
      <p>
        Minima: {data.main.temp_min}°C / Maxima: {data.main.temp_max}°C
      </p>
      <p>Humedad: {data.main.humidity}%</p>
    </footer>
  </article>
);

const Loader = () => <article aria-busy={true}></article>;

const ErrorMessage = ({ error }) => (
  <div className="error-message" role="alert">
    {error}
  </div>
);

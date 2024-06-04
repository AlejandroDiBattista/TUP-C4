const KEY = "5371e000b54340634dddb74a8dd70de4";

function AppClima() {
  const [ciudad, setCiudad] = React.useState("Noruega");
  const [clima, setClima] = React.useState(null);
  
  const obtenerClima = (ciudad) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${KEY}&lang=es`
    )
      .then((response) => response.json())
      .then((data) => {
        const datosClima = {
          ciudad: data.name,
          temperatura: data.main.temp,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          humedad: data.main.humidity,
          icono: data.weather[0].icon,
        };
        setClima(datosClima);
      })
      .catch((error) =>
        console.error("ERROR", error)
      );
  };

  React.useEffect(() => {
    obtenerClima(ciudad);
  }, [ciudad]);

  return (
    <div>
      <navBar setCiudad={setCiudad} />
      <BuscadorCiudad setCiudad={setCiudad} />
      {clima && <TarjetaClima {...clima} />}
    </div>
  );
}

function navBar({ setCiudad }) {
  return (
    <nav className="nav">
      <ul>
        <li>
          <h3>Clima</h3>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" className="ciudades" onClick={() => setCiudad("Tucuman")}>
            Tucuman
          </a>
        </li>
        <li>
          <a href="#" className="ciudades" onClick={() => setCiudad("Salta")}>
            Salta
          </a>
        </li>
        <li>
          <a
            href="#"
            className="ciudades"
            onClick={() => setCiudad("Buenos Aires")}
          >
            Buenos Aires
          </a>
        </li>
      </ul>
    </nav>
  );
}

function BuscadorCiudad({ setCiudad }) {
  const [valorEntrada, setValorEntrada] = React.useState("");

  const manejarBusqueda = (event) => {
    event.preventDefault();
    if (valorEntrada) {
      setCiudad(valorEntrada);
    }
  };

  return (
    <div className="search">
      <form onSubmit={manejarBusqueda}>
        <input
          className="search-input"
          type="search"
          name="search"
          placeholder="Buscar"
          aria-label="Buscar"
          value={valorEntrada}
          onChange={(e) => setValorEntrada(e.target.value)}
        />
      </form>
    </div>
  );
}

function TarjetaClima({
  ciudad,
  temperatura,
  tempMin,
  tempMax,
  humedad,
  icono,
}) {
  return (
    <article className="tiempo">
      <header className="nombre-ciudad">{ciudad}</header>
      <img
        className="tiempo2"
        src={`openweathermap/${icono}.svg`}
        alt="Icono del clima"
      />
      <footer className="footer">
        <h2>Temperatura: {temperatura.toFixed(2)}°C</h2>
        <p>
          Mínima: {tempMin}°C / Máxima: {tempMax.toFixed(2)}°C
        </p>
        <p>Humedad: {humedad}%</p>
      </footer>
    </article>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppClima />);

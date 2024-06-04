const API_KEY = '30d38b26954359266708f92e1317dac0'

const UrlApi = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

function App() {

    return  <>
        <h1>Clima</h1>
        <div className="ciudades">
            <a href="#" id="tucuman">Tucumán</a>
            <a href="#" id="salta">Salta</a>
            <a href="#" id="buenosaires">Buenos Aires</a>     
        </div> 
        <input type="text" id="buscador"className="buscador" placeholder="Buscar ciudad..."></input> 

        <input type="card" id="tarjeta"className="tarjeta" placeholder="" ></input>
        <h1 id="ciudad" style={{position:"relative",bottom:"579px",left:"15px", fontSize:"30px"}}>Ciudad</h1>
        <h1 id="temperatura" style={{position:"relative",bottom:"275px",left:"15px", fontSize:"28px"}}>Temperatura: 18.29 C</h1> 
        <p id="tempminmax" style={{position:"relative",bottom:"282px",left:"15px"}}>Minima: / Maxima:</p>
        <p id="humedad" style={{position:"relative",bottom:"280px",left:"15px"}}>Humedad: 74</p>

    </>
};


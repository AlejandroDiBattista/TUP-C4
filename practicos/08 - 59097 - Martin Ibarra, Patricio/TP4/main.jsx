const API_KEY = '30d38b26954359266708f92e1317dac0'

const UrlApi = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

function App() {
    return <>
        <h1>Clima</h1>
        <div className="ciudades">
            <a href="#" id="tucuman">Tucumán</a>
            <a href="#" id="salta">Salta</a>
            <a href="#" id="buenosaires">Buenos Aires</a>     
        </div> 
        <input type="text" id="buscador"className="buscador" placeholder="Buscar ciudad..."></input>   
    </>
}
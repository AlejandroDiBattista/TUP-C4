const API_KEY = '30d38b26954359266708f92e1317dac0'

async function ApiClima(nombreCiudad){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${API_KEY}&units=metric&lang=en`)
        if (response.ok) {
            const data = await response.json()
            console.log(data,"datos")
            return{ 
                status:response.status,
                data:data
            }
        }
        return {
           status:response.status,
           data:null
        }          
    } catch (error) {

    }
   

}
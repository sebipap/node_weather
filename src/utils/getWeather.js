const axios = require('axios')

const OWM_key = "541d13323b3a705b9fd363331a5d9cc9"
getWeatherURL = (lat,lon) => "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&appid=" + OWM_key + "&units=metric&lang=es"

const getWeather = ({lat, lon}, callback) => {
    url = getWeatherURL(lat,lon)
    axios.get(url)
    .then(({data}) =>{
        callback(undefined, {
            desc: data.weather[0].description,
            temp: data.main.temp
        })
    })
    .catch(()=>{callback("Weather error" , undefined)})
    
}


module.exports = getWeather
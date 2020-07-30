const axios = require('axios')

const MB_key = "pk.eyJ1Ijoic2ViaXBhcHMiLCJhIjoiY2szNHhyZnVpMDA1MjNua2VzY212bzlnMSJ9.EVcwNe2lyq9FE6tXnnEauA"
getMapBoxURL = query => "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(query) + ".json?access_token=" + MB_key

const geocode = (city, callback) => {
    const url = getMapBoxURL(city)
    axios.get(url)
    .then(({data}) => {

        if(data.features.length===0){
            callback('No se ha encontrado esa ubicacion')
 
        }else{
            const {features}=data //copio la propiedad features de data y la usamos con su nombre
            const { center, place_name} = features[0] // dentro de features[0] copio todas las prop que necesito
            callback(undefined, {
                lat: center[1],
                lon: center[0],
                location: place_name
            })
        }
    })
    .catch(()=>{
        callback('No se puede conectar', undefined)
    })


}

module.exports = geocode
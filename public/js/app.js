search = () =>{
    document.getElementById('searchImg').src = 'https://canvas-rsc.ilumno.com/testilumno/prod/js/repositorio/js/components/img/loading.gif'
    let sTerm = document.getElementById('search').value
    let url = '/weather?city=' + sTerm
    console.log(sTerm)
   

    fetch(url).then( (res) => {
    res.json().then((data) => {
        
        let {location, forecast, temperature, temp_max, temp_min, error} = data
        console.log(data)
        temperature = Math.round(temperature)
        temperature += "°"

        temp_max = Math.round(temp_max)
        temp_max += "°"

        temp_min = Math.round(temp_min)
        temp_min += "°"

        if(location && forecast && temperature || error){
            document.getElementById('forecast').style= 'display: flex'
        }

        if(error){
            document.getElementById('fetch_location').innerHTML = error
            document.getElementById('fetch_forecast').innerHTML = ""
            document.getElementById('fetch_temperature').innerHTML = "" 
            document.getElementById('searchImg').src = 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png'
        }else{
            document.getElementById('fetch_location').innerHTML = location
            document.getElementById('fetch_forecast').innerHTML = forecast
            document.getElementById('fetch_temperature').innerHTML = temperature
            document.getElementById('fetch_temp_max').innerHTML = temp_max
            document.getElementById('fetch_temp_min').innerHTML = temp_min
            
            document.getElementById('searchImg').src = 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png'

           
        }

     
    })
})
}
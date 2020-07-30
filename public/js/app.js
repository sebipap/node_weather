console.log('esto esta corriendo desde chrome')



search = () =>{
    document.getElementById('searchImg').src = 'https://canvas-rsc.ilumno.com/testilumno/prod/js/repositorio/js/components/img/loading.gif'
    let sTerm = document.getElementById('search').value
    let url = 'http://localhost:3000/weather?city=' + sTerm
    console.log(sTerm)
   

    fetch(url).then( (res) => {
    res.json().then((data) => {
        
        let {location, forecast, temperature, error} = data
        console.log(data)
        temperature = Math.round(temperature)
        temperature += "°"

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
            
            document.getElementById('searchImg').src = 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png'

           
        }

     
    })
})
}
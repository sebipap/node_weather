// Importamos paquetes
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const getWeather = require('./utils/getWeather')



const app = express()

//Define paths to express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Meteorologo Nacional: Ruperti Gomez'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'CEO Sebastian Papanicolau'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Ayuda',
        helpMsg: '¿Nececitás ayuda?',
        name: 'Gerente de ayuda: Pablo Gomez'
    })
})






app.get('/weather', (req, res) => {
    if(!req.query.city){
        return res.send({
            error: 'Proporcione un termino de busqueda'
        })}

        const {city} = req.query

        geocode(city, (error, data) => {
            if(error){
                return res.send({error})
            }else{
                getWeather(data, (error, Wdata)=>{
                    if(error){
                        return res.send({error})
                    }else{
                        res.send({
                            location: data.location,
                            forecast: Wdata.desc,
                            temperature: Wdata.temp
                        })
         
                        
                    }
                })
            }
        })

        
    



})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Invalid Help subdirectory'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('server is up in port 3000')
})
//Core modul
const path = require('path')

//npm modules
const express = require('express')
const hbs = require('hbs')

//Custom modules
const openWeather = require('../../weather-app/utils/openWeather')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lucas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Lucas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help text',
        title: 'Help',
        name: 'Lucas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.local) {
        return res.send({
            error: 'A local must be provided!'
        })
    }
    const localWeather = req.query.local
    openWeather(localWeather, (err, data) => {
        if (err === undefined) {
            return res.send({
                cityName: data.body.name,
                temperature: data.body.main.temp
            })
        }
        res.send({message: err})
        
    })
})

//Example use

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lucas',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lucas',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
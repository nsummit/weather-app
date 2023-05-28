const express = require('express');
const axios = require('axios').default;

app = express();
app.use(express.json());

const weatherApi = axios.create({
    baseURL: 'http://api.weatherapi.com',
    params: { key: '1c3b67ddc2544c0596675503232305' }
})


// Location Search / Auto-complete Location                    
app.get('/api/search/:searchkey', (req, res) => {
    let result = [];
    weatherApi.get(`/v1/search.json?&q=${req.params.searchkey}`)
        .then((response) => {

            let data = response.data;
            data.forEach(element => {
                result.push({
                    "name": element.name,
                    "country": element.country,
                    "lat": element.lat,
                    "lon": element.lon,
                });
            });

            res.send(result)
        })
        .catch((error) => { console.error(error) })
});


// Location based weather
app.get('/api/location/:lat/:lon', (req, res) => {
    weatherApi.get(`/v1/current.json?&q=${req.params.lat},${req.params.lon}&aqi=no`)
        .then((response) => { res.send(response.data) })
        .catch((error) => { console.error(error) })
});

// Location based weather forecast
app.get('/api/forecast/:days/:lat/:lon', (req, res) => {
    weatherApi.get(`/v1/forecast.json?&q=${req.params.lat},${req.params.lon}&days=${req.params.days}&aqi=no&alerts=no`)
        .then((response) => { res.send(response.data) })
        .catch((error) => { console.error(error) })
});

app.listen(3000, () => console.log('Listening on port 3000...'));
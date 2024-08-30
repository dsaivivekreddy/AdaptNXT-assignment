// Importing express module
const express = require('express');

// Creating express instance
const app = express();

// Importing dotenv variables
require('dotenv').config()
const API_KEY=process.env.API_KEY;
const port=process.env.port

// get API call
app.get('/weatherinfo/:location',async(req,res)=>{
    const location =req.params.location

// Weatherstack url
    const url=`https://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`
    try{
        const response=await fetch(url)
        const weatherData=await response.json()
        if (weatherData) {
            res.json({
              country:weatherData.location.country,
              region:weatherData.location.region,
              temperature: weatherData.current.temperature,
              weather: weatherData.current.weather_descriptions[0],
              windSpeed: weatherData.current.wind_speed,
            });
          } 
    }
    catch(error){
        res.json({error:'Error fetching weather data'})
        return null;
    }
    

})

//Initialization of server

app.listen(port,function(){
    console.log("Server started running successfully")
})
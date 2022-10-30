import express from "express";
import { get } from "https";
import { urlencoded } from "body-parser";
const app = express();
app.use(urlencoded({ extended: true }));
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    console.log(req.body);
    var city = parseFloat(req.body.city);

    const url = "https://api.weatherapi.com/v1/current.json?key=5985ab148e6448c2acc133700222810&q=" + city + "&aqi=no#"
    get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            console.log(weatherData);
             const name=weatherData.location.name;
             const region=weatherData.location.region;
            const country=weatherData.location.country;
            const log=weatherData.location.lon;
            const lat=weatherData.location.lat;
             res.write("<p>name of countary</P>" +name);
            res.write("<P>region</P>"+region);
            res.write("<p>country</p>"+country)
             res.write("<p>latitute and longitute </p>"+log,lat);



        });
    })
    
        app.post("/", function (req, res) {
            console.log(req.body);
            var city = parseFloat(req.body.city);
            var day = parseFloat(req.body.day);
            const url = "https://api.weatherapi.com/v1/forecast.json?key=a7878497d5aa4e9bbe1145219220703&q=" + city + "&days=" + day + "&aqi=no&alerts=no"
            get(url, function (response) {
                console.log(response.statusCode);
                response.on("data", function (data) {
                    const forecast = JSON.parse(data)
                    console.log(forecast);
                    const sunrise=forecast.forecast.forecastday[0].astro.sunrise;
                      const sunset=forecast.forecast.forecastday[0].astro.sunset;
                      const moonrise=forecast.forecast.forecastday[0].astro.moonrise;
                      const moonset=forecast.forecast.forecastday[0].astro.moonset;
                      const moonphase=forecast.forecast.forecastday[0].astro.moon_phase;
                      const moonillumation=forecast.forecast.forecastday[0].astro.moon_illumination;
                     res.write("<p>sunrise</P>" +sunrise);
                     res.write("<P>sunset </P>"+sunset);
                     res.write("<p>mooonrise</p>"+moonrise)
                     res.write("<p>moonset</p>"+moonset)
                     res.write("<p>moonphse</p>"+moonphase)
                     res.write("<p>moonilluminate</p>"+moonillumation)
                 });
              })
        });



        app.listen(3007, function () {
            console.log("Server is running on port 3001");
        })
});
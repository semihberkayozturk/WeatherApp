//jshint esversion:6 
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {

    const query = req.body.cityName;
    const apiKey = "69f04e4613056b159c2761a9d9e664d2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {

        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1 style=text-align:center;color:white;>The temperature in " + query + " is " + temp + " degrees Celcius. </h1>");
            res.write("<h2 style=text-align:center;color:white;>The weather is currently " + description + "</h2>");
            res.write("<img style=margin-left:43%;width:10rem; src=" + imageUrl + ">");
            res.write("<body style=background-color:cadetblue;></body>");

            res.send();
        });

    });
});
app.listen(3000, function() {
    console.log("The server has started on port 3000.");
});
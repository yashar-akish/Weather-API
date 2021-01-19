const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // res.send("Server is up and running.");
})
app.post("/", (req, res) => {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "99e6a68f917cf2df5fd4f6298e44ff48";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + description + " </p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius.</h1>");
      res.write("<img src=" + imageURL + ">")
      res.send();
    })
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
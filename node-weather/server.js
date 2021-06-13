const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
require("dotenv").config()



app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {res.render('index');})
app.post('/', function (req, res) {
   
    
    const url = `http://api.weatherstack.com/current?access_key=${process.env.apiKey}&query=${req.body.city}`
    console.log(req.body.city);
    request(url, function (err, response, body) {
        if(err){
          console.log('error:', error);
        } else {
          const bodyJson = JSON.parse(body)
         
          let message = `Today is ${bodyJson.current.temperature} degrees in ${bodyJson.location.name} ` 
          res.render('index', {message});

          console.log(message);
        }
      });
  })
  
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


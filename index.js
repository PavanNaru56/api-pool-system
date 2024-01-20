
//require to install express from npm and import the express
const express = require('express');

//current port
const port = 8000;
//to start the express
const app = express();
//body-parser required to get the data in text 0r encode format
const bodyParser = require('body-parser');
//config the mongodb
const db = require('./config/mongoose');


app.use(express.json());
app.use(express.urlencoded());

//setting ip the routes

app.use('/',require('./routes/index'));
//port on running on 8000
app.listen(port,(err)=>{
    if(err){
        console.log('Eroor in port',err);
    }
    console.log('port running successfully');
})
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const modulePost = require('./routes/modulePos');
const index = require('./routes/index');
const mongoose = require('mongoose');
// const Cabi = require('./model/Cabi')

setTimeout(function(){
  mongoose
      .connect('mongodb://yared_gonzalez_mongo_1/cabiDB', { useNewUrlParser: true })
      .then(x => {
          console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
      })
      .catch(err => {
          console.error('Error connecting to mongo', err)
      });
}, 10000);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/', modulePost);


// Server Started
app.listen(9001, () => {
  console.log('Hola, Mundo!')
});
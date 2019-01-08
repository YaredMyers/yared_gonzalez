const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const modulePost = require('./routes/modulePos');
const index = require('./routes/index');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/', modulePost);


// Server Started
app.listen(9001, () => {
  console.log('Hola, Mundo!')
});
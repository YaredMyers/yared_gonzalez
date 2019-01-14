require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const modulePost = require('./src/routes/modulePos');
const index = require('./src/routes/modulePos');
const getAllMsgRoute = require('./src/client/msgGet');
const creditPost = require('./src/routes/creditPost');
const connectDB = require('./src/mongoDBModule');
const myPORT = process.env.PORT;
const getCreditRoute = require('./src/client/creditGet')

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/', modulePost);
app.use('/', getAllMsgRoute);
app.use('/', creditPost);
app.use('/', getCreditRoute);


// Server Started
app.listen(9001, () => {
  console.log('Hola, Mundo!')
});

app.listen(myPORT, () => {
console.log('Hello World! From 9001 PORT!!')
});
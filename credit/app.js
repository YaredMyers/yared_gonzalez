require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
// const modulePost = require('../message/src/routes/modulePos');
// const index = require('../message/src/routes/index');
// const getAllMsgRoute = require('../message/src/client/msgGet');
const creditPost = require('./src/routes/creditPost');
const myPORT = process.env.PORT;
const getCreditRoute = require('./src/client/creditGet')
const {creditQueue, messageQueue} = require('./src/qeuesCredit/qeuesCredit');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/', index);
// app.use('/', modulePost);
// app.use('/', getAllMsgRoute);
app.use('/', creditPost);
app.use('/', getCreditRoute);


// Server Started
app.listen(9017, () => {
  console.log('Hola, Mundo!')
});

// app.listen(myPORT, () => {
// console.log('Hello World! From 9001 PORT!!')
// });
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const modulePost = require('./src/routes/modulePos');
const index = require('./src/routes/modulePos');
const getAllMsgRoute = require('./src/client/msgGet');
// const creditPost = require('../credit/src/routes/creditPost');
// const myPORT = process.env.PORT;
// const getCreditRoute = require('../credit/src/client/creditGet')
const {creditQueue, messageQueue} = require('./src/qeues/qeues');
const getHealthRoute = require('./src/routes/healthGet');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/', index);
app.use('/', modulePost);
app.use('/', getAllMsgRoute);
// app.use('/', creditPost);
// app.use('/', getCreditRoute);
app.use('/', getHealthRoute);





// Server Started
app.listen(9007, () => {
  console.log('Hola, Mundo!')
});

// app.listen(myPORT, () => {
// console.log('Hello World! From 9001 PORT!!')
// });
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const creditPost = require("./src/routes/creditPost");
const myPORT = process.env.PORT;
const getCreditRoute = require("./src/client/creditGet");
const { creditQueue, messageQueue } = require("./src/qeuesCredit/qeuesCredit");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", creditPost);
app.use("/", getCreditRoute);

app.listen(9017, () => {
  console.log("Hola, Mundo!");
});

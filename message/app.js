require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const modulePost = require("./src/routes/modulePos");
const index = require("./src/routes/modulePos");
const getAllMsgRoute = require("./src/client/msgGet");
const { creditQueue, messageQueue } = require("./src/qeues/qeues");
const getHealthRoute = require("./src/routes/healthGet");
const logger = require('./src/winston/logs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", modulePost);
app.use("/", getAllMsgRoute);

app.use("/", getHealthRoute);

app.listen(9007, () => {
  logger.info("Hola, Mundo!");
});

const express = require("express");
const CabiMsg = require("../models/CabiMsg");
const getHealthRoute = express.Router();
const logger = require('../winston/logs');

getHealthRoute.get("/health", (req, res, next) => {
  // logger.info("I'm Alive! :)")
  res.status(200).send("I'm Alive dudes! :)");
});

module.exports = getHealthRoute;

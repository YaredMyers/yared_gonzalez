const express = require("express");
const CabiMsg = require("../models/CabiMsg");
const getHealthRoute = express.Router();

getHealthRoute.get("/health", (req, res, next) => {
  // console.log("I'm Alive! :)")
  res.status(200).send("I'm Alive dudes! :)");
});

module.exports = getHealthRoute;

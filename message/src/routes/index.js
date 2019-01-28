const express = require("express");
const router = express.Router();
const axios = require("axios");
const logger = require('../winston/logs');

// our first Route
router.get("/", (request, response, next) => {
  logger.info(request);
  response.send("Hola, Mundo! :)");
});

module.exports = router;

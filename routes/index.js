const express = require("express");
const router = express.Router();
const axios = require("axios");
// const modulePos = require('./modulePos')


// our first Route
router.get("/", (request, response, next) => {
  console.log(request);
  response.send("Hola, Mundo! :)");
});


module.exports = router;

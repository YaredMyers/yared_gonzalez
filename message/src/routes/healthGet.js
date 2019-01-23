const express = require('express');
const CabiMsg = require('../models/CabiMsg');
const getHealthRoute = express.Router();

getHealthRoute.get('/health', (req,res,next)=> {
  console.log("I am vivo")
res.sendStatus(200)
})

module.exports = getHealthRoute;



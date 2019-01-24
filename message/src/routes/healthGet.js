const express = require('express');
const CabiMsg = require('../models/CabiMsg');
const getHealthRoute = express.Router();

getHealthRoute.get('/health', (req,res,next)=> {
  console.log("I'm Alive! :)")
res.status(200).send("Eres viejoven")
})

module.exports = getHealthRoute;



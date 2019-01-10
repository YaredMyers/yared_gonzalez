const express = require("express");
const modulePost = express.Router();
const axios = require("axios");
const clientMessageApp = require("../clientMessageApp");
const saveMsg = require("../msgCreation");

modulePost.post("/messages", (request, response, next) => {
  const {destination, body} = request.body;
  if (typeof destination !== "string" || typeof body !== "string") {
    response.status(400);
    response.send("It has to be an string");
  } else if (destination === "" || body === "") {
    response.status(400);
    response.send("You have empty files, why are you so lazy?");
  } else if (destination !== "" && !destination.includes("@")){
    response.status(400);
    response.send("Destination has to be an email");
  } else if (destination.length > 30 || body.length > 50) {
    response.status(400);
    response.send("You only can use 30 characters or less");



  } else {



    console.log("ENTRA")
    
    clientMessageApp(destination, body)
    .then(resp => {
      var status = "OK MAKEY";
      saveMsg(destination, body, status)
      console.log("Entra por Axios then")
      response.status(200);
      response.send(`${resp.data}`)
    })
    .catch(e => { 
      var status = "KEEP TRYING";
      saveMsg(destination, body, status)
      console.log("Error, internal server error");
      response.status(500);
      response.send("Send again guapetón, que hay premio");
    });
  }
});

module.exports = modulePost;

const express = require("express");
const modulePost = express.Router();
const axios = require("axios");
const clientMessageApp = require("../clientMessageApp");

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
  } else if (destination.length > 30 || body.length > 30) {
    response.status(400);
    response.send("You only can use 30 characters or less");
  } else {
  clientMessageApp(destination, body)
    .then(resp => {
      console.log(resp)
      response.status(200);
      response.send(`${resp.data}`);
      console.log(clientMessageApp);
    })
    .catch(e => {
      console.log(e)
      console.log("Error, internal server error");
      response.status(500);
      response.send("Send again guapetón, que hay premio");
    });
  }
});

module.exports = modulePost;

const express = require("express");
const modulePost = express.Router();
const axios = require("axios");
const clientMessageApp = require("../clientMessageApp");

modulePost.post("/messages", (request, response, next) => {
  const {destination, body} = request.body

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
});

module.exports = modulePost;

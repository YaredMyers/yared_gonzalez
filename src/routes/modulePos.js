const express = require("express");
const modulePost = express.Router();
const fieldsValidation = require("../validations/validations");

modulePost.post("/messages", (request, response, next) => {
  const { destination, body } = request.body;
  fieldsValidation(request, response, next);
});

module.exports = modulePost;

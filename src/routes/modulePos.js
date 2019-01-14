const express = require("express");
const modulePost = express.Router();
const fieldsValidation = require("../validations/validations");
const checkCredit = require('../validations/creditValidation');

modulePost.post("/messages", (request, response, next) => {
  // const { destination, body } = request.body;
  checkCredit(request, response, next);
});

module.exports = modulePost;

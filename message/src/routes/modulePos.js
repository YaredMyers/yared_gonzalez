const express = require("express");
const modulePost = express.Router();
const fieldsValidation = require("../validations/validations");
// const checkCredit = require("../../../credit/src/validations/creditValidation");

modulePost.post("/messages", (request, response, next) => {
  checkCredit(request, response, next);
});

module.exports = modulePost;

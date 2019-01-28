const express = require("express");
const modulePost = express.Router();
const fieldsValidation = require("../validations/validations");
const uuidv4 = require("uuid/v4");
const messageQueue = require("../qeues/qeues");

modulePost.post("/messages", (request, response, next) => {
  fieldsValidation(request, response);
  // checkCredit(request, response, next);
});

module.exports = modulePost;

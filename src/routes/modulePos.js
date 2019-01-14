const express = require("express");
const modulePost = express.Router();
const fieldsValidation = require("../validations/validations");
const saveCredit = require('../client/globalCreditCreation');

modulePost.post("/messages", (request, response, next) => {
  const { destination, body } = request.body;
  fieldsValidation(request, response, next);
});

modulePost.post("/credit", (request, response, next) => {
  const amount  = request.body.amount;
  saveCredit(amount);
});

module.exports = modulePost;

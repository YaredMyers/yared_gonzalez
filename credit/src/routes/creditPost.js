const express = require("express");
const creditPost = express.Router();
const fieldsValidation = require("../../../message/src/validations/validations");
const saveCredit = require("../client/globalCreditCreation");
var locks = require("locks");
var mutex = locks.createMutex();

creditPost.post("/credit", (request, response, next) => {
  const amount = request.body.amount;
  saveCredit(amount, response);
});

module.exports = creditPost;

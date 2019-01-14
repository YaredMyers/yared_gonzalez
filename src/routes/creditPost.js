const express = require("express");
const creditPost = express.Router();
const fieldsValidation = require("../validations/validations");
const saveCredit = require('../client/globalCreditCreation');
var locks = require('locks');
var mutex = locks.createMutex();

creditPost.post("/credit", (request, response, next) => {
  const amount  = request.body.amount;
  mutex.lock(function () {
    console.log('We got the lock!');
  saveCredit(amount, response);
  mutex.unlock();
});
});

module.exports = creditPost;


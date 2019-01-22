const express = require("express");
const modulePost = express.Router();
const fieldsValidation = require("../validations/validations");
// const checkCredit = require("../../../credit/src/validations/creditValidation");
const addToMyCreditQueue = require('../../../credit/src/qeuesCredit/qeuesCredit')
const uuidv4 = require("uuid/v4");

modulePost.post("/messages", (request, response, next) => {
  fieldsValidation(request,response);
  // checkCredit(request, response, next);
  
});

module.exports = modulePost;

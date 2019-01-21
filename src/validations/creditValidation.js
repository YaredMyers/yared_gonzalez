const fieldsValidation = require("../validations/validations");
const CabiCredit = require("../models/CabiCredit");

let checkCredit = function(request, response, next) {
  
          CabiCredit("primary").find({})
    .then(resp => {
      if (resp[0].amount === 0) {
        response.status(500).send("no hay saldo");
        console.log("no hay saldo");
      } else {
        fieldsValidation(request, response, next);
      }
    })
    .catch(resp => {
      response.status(500).send("no hay saldo en el catch");
    });
};

module.exports = checkCredit;

const fieldsValidation = require("../validations/validations");
const CabiCredit = require("../models/CabiCredit");

let checkCredit = function(request, response, next) {

  CabiCredit("primary")
    .find({})
    .then(resp => {
      if (resp[0].amount === 0) {
        console.log("no hay saldo");
      } else {

        fieldsValidation(request, response, next);
      }
    })
    .catch(resp => {
      console.log("no hay saldo en el catch");
      console.log(resp)
    });
};

module.exports = checkCredit;

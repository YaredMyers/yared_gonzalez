// const fieldsValidation = require("../../../message/src/validations/validations");
const CabiCredit = require("../models/CabiCredit");
const addToMyQueue = require('../../../message/src/qeues/qeues');
const Queue = require("bull");
const addToMyCreditQueue = require('../qeuesCredit/qeuesCredit');




let checkCredit = function(request, response, next) {

  CabiCredit("primary")
    .find({})
    .then(resp => {
      if (resp[0].amount === 0) {

        let checkMyCabiCredit = {
          type: "Check my Credit",
          msgID: job.data.msgID,
          message: job.data,
          statusCredit: "STATUS: NO"
        }

        console.log("no hay saldo");
        return addToMyQueue.process(checkMyCabiCredit);

      } else {

        let checkMyCabiCredit = {
          type: "Check my Credit",
          msgID: msgID,
          message: job.data,
          statusCredit: "STATUS: YES"
        }

        // fieldsValidation(request, response, next);
        addToMyQueue.process(checkMyCabiCredit);
      }
    })
    .catch(resp => {
      console.log(resp)

      let checkMyCabiCredit = {
        type: "Check my Credit",
        msgID: msgID,
        message: job.data,
        status: "STATUS: NO"
      }
      console.log("no hay saldo en el catch");
    });
};

module.exports = checkCredit;

// const fieldsValidation = require("../../../message/src/validations/validations");
const CabiCredit = require("../models/CabiCredit");
// const addToMyQueue = require('../qeuesCredit/qeuesCredit');
// const Queue = require("bull");
// const addToMyCreditQueue = require('../qeuesCredit/qeuesCredit');
// const uuidv4 = require("uuid/v4");



// const msgID = uuidv4();

let checkCredit = function(job) {
  return CabiCredit("primary")
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
      return checkMyCabiCredit;
      
    } else {
      
        let checkMyCabiCredit = {
          type: "Check my Credit",
          msgID: job.data.msgID,
          message: job.data,
          statusCredit: "STATUS: OK"
        }
        console.log( "GENIAL STATUS OK")
        // fieldsValidation(request, response, next);
        return checkMyCabiCredit
      }
    })
    .catch(resp => {
      console.log(resp)

      let checkMyCabiCredit = {
        type: "Check my Credit",
        msgID: msgID,
        message: job.data,
        statusCredit: "STATUS: NO"
      }
      console.log("no hay saldo en el catch");
      return checkMyCabiCredit

    });
};

module.exports = checkCredit;

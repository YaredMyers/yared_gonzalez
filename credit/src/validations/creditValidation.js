const CabiCredit = require("../models/CabiCredit");

let checkCredit = function(job) {
  return CabiCredit("primary")
    .find({})
    .then(resp => {
      if (resp[0].amount === 0) {
        let checkMyCabiCredit = {
          type: "Check my Credit",
          msgID: job.data.msgID,
          message: job.data,
          status: "STATUS: NO"
        };

        console.log("no hay saldo");
        return checkMyCabiCredit;
      } else {
        let checkMyCabiCredit = {
          type: "Check my Credit",
          msgID: job.data.msgID,
          message: job.data,
          status: "STATUS: OK"
        };
        console.log("GENIAL STATUS OK");
        return checkMyCabiCredit;
      }
    })
    .catch(resp => {
      console.log(resp);

      let checkMyCabiCredit = {
        type: "Check my Credit",
        msgID: job.data.msgID,
        message: job.data,
        status: "STATUS: NO"
      };
      console.log("no hay saldo en el catch");
      return checkMyCabiCredit;
    });
};

module.exports = checkCredit;

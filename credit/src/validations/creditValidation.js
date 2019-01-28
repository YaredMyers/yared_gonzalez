const CabiCredit = require("../models/CabiCredit");
const logger = require('../winston/logs');

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

        logger.info("no hay saldo");
        return checkMyCabiCredit;
      } else {
        let checkMyCabiCredit = {
          type: "Check my Credit",
          msgID: job.data.msgID,
          message: job.data,
          status: "STATUS: OK"
        };
        logger.info("GENIAL STATUS OK");
        return checkMyCabiCredit;
      }
    })
    .catch(resp => {
      logger.info(resp);

      let checkMyCabiCredit = {
        type: "Check my Credit",
        msgID: job.data.msgID,
        message: job.data,
        status: "STATUS: NO"
      };
      logger.info("no hay saldo en el catch");
      return checkMyCabiCredit;
    });
};

module.exports = checkCredit;

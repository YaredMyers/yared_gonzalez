const CabiMsg = require("../models/CabiMsg");
const logger = require('../winston/logs');

let saveMsg = function(msgID, status) {
  let MessagePrimary = CabiMsg("primary");
logger.info(msgID)
logger.info(status)
  return MessagePrimary.findOneAndUpdate(
    { msgID: msgID },
    { status: status },
    { new: true }
  )
    .then(messageP => {
      logger.info(messageP);
      let MessageReplica = CabiMsg("replica");
      return MessageReplica.findOneAndUpdate(
        { msgID: msgID },
        { status: status },
        { new: true }
      )
        .then(messageP => {
          logger.info(messageP);
          logger.info("PENDING ---> OK, TIMEOUT, ERROR");
        })
        .catch(error => {
          return logger.error(error);
        });
    })
    .catch(error => {
      logger.error(error);
      logger.error("Error Primary: PENDING ---> OK, TIMEOUT, ERROR");
    });
};

module.exports = saveMsg;

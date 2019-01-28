const CabiMsg = require("../models/CabiMsg");
const logger = require('../winston/logs');

let pendingMessageSave = function(messageObj) {
  let PrimaryMsg = CabiMsg("primary");
  let myMessagePrimary = new PrimaryMsg(messageObj);

  return myMessagePrimary
    .save()
    .then(myMessage => {
      logger.info("guardado PENDING en primary");
      let ReplicaMsg = CabiMsg("replica");
      let myMessageReplica = new ReplicaMsg(messageObj);

      return myMessageReplica
        .save()
        .then(myMessage => {
          logger.info("guardado PENDING en replica");
        })
        .catch(myMessage => {
          return logger.error("error guardando PENDING en replica");
        });
    })
    .catch(myMessage => {
      logger.error("error guardando PENDING en primary");
    });
};

module.exports = pendingMessageSave;

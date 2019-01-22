const CabiMsg = require("../models/CabiMsg");

let pendingMessageSave = function(messageObj) {
  let PrimaryMsg = CabiMsg("primary");
  let myMessagePrimary = new PrimaryMsg(messageObj);

  return myMessagePrimary
    .save()
    .then(myMessage => {
      console.log("guardado PENDING en primary");
      let ReplicaMsg = CabiMsg("replica");
      let myMessageReplica = new ReplicaMsg(messageObj);

      return myMessageReplica
        .save()
        .then(myMessage => {
          console.log("guardado PENDING en replica");
        })
        .catch(myMessage => {
          return console.log("error guardando PENDING en replica");
        });
    })
    .catch(myMessage => {
      console.log("error guardando PENDING en primary");
    });
};

module.exports = pendingMessageSave;

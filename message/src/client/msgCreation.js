const CabiMsg = require("../models/CabiMsg");

let saveMsg = function(msgID, status) {
  let MessagePrimary = CabiMsg("primary");
console.log(msgID)
console.log(status)
  return MessagePrimary.findOneAndUpdate(
    { msgID: msgID },
    { status: status },
    { new: true }
  )
    .then(messageP => {
      console.log(messageP);
      console.log("GUAY");
      let MessageReplica = CabiMsg("replica");
      return MessageReplica.findOneAndUpdate(
        { msgID: msgID },
        { status: status },
        { new: true }
      )
        .then(messageP => {
          console.log(messageP);
          console.log("PENDING ---> OK, TIMEOUT, ERROR");
        })
        .catch(error => {
          return console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
      console.log("Error Primary: PENDING ---> OK, TIMEOUT, ERROR");
    });
};

module.exports = saveMsg;

const CabiMsg = require("./models/CabiMsg.js");

let saveMsg = function(destination, body) {
  // const destination = req.body.destination;
  // const body = req.body.body;
  const newMsg = new CabiMsg({ destination, body });
  newMsg
    .save()
    .then(() => {
      console.log("Msg successfully created :)");
    })
    .catch(() => {
      console.log("Brah, keep trying, there is a reward for you xD");
    });
};

module.exports = saveMsg;

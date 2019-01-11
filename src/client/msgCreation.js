const CabiMsg = require("../models/CabiMsg");

let saveMsg = function(destination, body, status) {
  const newMsg = new CabiMsg({ destination, body, status });
  newMsg
    .save()
    .then(() => {
      console.log("MSG successfully created :)");
    })
    .catch(() => {
      console.log("MSG creation failed");
    });
};

module.exports = saveMsg;

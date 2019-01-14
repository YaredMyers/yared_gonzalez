const CabiGlobalCredit = require("../models/CabiCredit");

let saveCredit = function(amount) {
  const newCredit = new CabiGlobalCredit( {amount} );
  newCredit
    .save()
    .then(() => {
      // response.status(200);
      // response.send("Dinero pa tu body");
      console.log("Credit successfully added :)");
    })
    .catch(() => {
      // response.status(500);
      // response.send("Msg saved, but external request failed");
      console.log("Credit failed");
    });
};

module.exports = saveCredit;

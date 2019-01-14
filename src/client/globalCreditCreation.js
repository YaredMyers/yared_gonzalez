const CabiGlobalCredit = require("../models/CabiCredit");

let saveCredit = function(amount, response) {
  const newCredit = new CabiGlobalCredit( {amount} );
  newCredit
    .save()
    .then(() => {
      response.status(200).send("Dinero pa tu body");
      console.log("Credit successfully added :)");
    })
    .catch(() => {
      response.status(500).send("No money no party :(");
      console.log("Credit failed");
    });
};

module.exports = saveCredit;

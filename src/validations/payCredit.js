const CabiGlobalCredit = require("../models/CabiCredit");

let payCredit = function(amount) {
  return CabiGlobalCredit.find({})
    .then(resp => {
      return CabiGlobalCredit.findOneAndUpdate(
        { _id: `${resp[0]._id}` },
        { amount: resp[0].amount - amount }
      );
      console.log("mensaje pagado");
    })
};

module.exports = payCredit;

const CabiCredit = require("../models/CabiCredit");
const logger = require('../winston/logs')

let payCredit = function() {
  return CabiCredit("primary")
    .find({})
    .then(credit => {
      let CreditPrimary = CabiCredit("primary");

      CreditPrimary.findOneAndUpdate(
        { _id: credit[0]._id },
        { amount: credit[0].amount - 100 }
      )
        .then(credit => {
          logger.info("Payed Primary!");

          return CabiCredit("replica")
            .find({})
            .then(credit2 => {
              let CreditReplica = CabiCredit("replica");

              CreditReplica.findOneAndUpdate(
                { _id: credit2[0]._id },
                { amount: credit2[0].amount - 100 }
              )
                .then(credit2 => {
                  logger.info("Payed Replica!");
                })
                .catch(credit2 => {
                  logger.error("Error paying on Replica! Retry again");

                  let CreditPrimary = CabiCredit("primary");
                  CreditPrimary.findOneAndUpdate(
                    { _id: credit2[0]._id },
                    { amount: credit2[0].amount + 100 }
                  );
                });
            })
            .catch(credit => {
              logger.info("Didn't find any credit account on Replica!");
            });
        })
        .catch(credit => {
          logger.error("Error paying!");
        });
    })
    .catch(credit => {
      logger.info("Didn't find any credit account!");
    });
};

module.exports = payCredit;

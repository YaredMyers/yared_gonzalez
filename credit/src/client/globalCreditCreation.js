const CabiCredit = require("../models/CabiCredit");
const isReplicaOnline = require("../../mongoDBModule2");
const logger = require('../winston/logs');

// backup

let saveCredit = function(amount, response) {
  if (typeof amount !== "number") {
    logger.warning("It has to be number");
  } else if (amount === "") {
    logger.warning("It has to be number");
  } else {
    if (isReplicaOnline) {
      return CabiCredit("primary")
        .find({})
        .then(credit => {
          if (credit.length === 0) {
            var CreditPrimary = CabiCredit("primary");
            var myCredit = new CreditPrimary({ amount });

            myCredit
              .save()
              .then(credit => {
                logger.info("primeraguardada");

                ///////
                return CabiCredit("replica")
                  .find({})
                  .then(credit => {
                    if (credit.length === 0) {
                      var CreditReplic = CabiCredit("replica");
                      var myCredit = new CreditReplic({ amount });

                      myCredit
                        .save()
                        .then(credit => {
                          logger.info("Todo esta guardado ahora!");
                        })
                        .catch(credit => {
                          logger.info("Error GUARDANDO LA SEGUNDA");
                        });
                    } else {
                      var CreditReplica = CabiCredit("replica");
                      var myCredit = new CreditReplica({ amount });

                      CreditReplica.findOneAndUpdate(
                        { _id: credit[0]._id },
                        { amount: credit[0].amount + amount }
                      )
                        .then(credit => {
                          logger.info("Credit two updated!");
                        })
                        .catch(credit => {
                          logger.info("Error updating credit");
                        });
                    }
                  })
                  .catch(error => {
                    logger.error(error);
                  });
              })
              .catch(credit => {
                logger.error("Error adding credit");
              });
          } else {
            CabiCredit("primary")
              .findOneAndUpdate(
                { _id: credit[0]._id },
                { amount: credit[0].amount + amount }
              )
              .then(credit => {
                logger.info("Credit updated!");
              })
              .catch(credit => {
                logger.error("Error updating credit");
              });

            CabiCredit("replica")
              .find({})
              .then(credit => {
                CabiCredit("replica")
                  .findOneAndUpdate(
                    { _id: credit[0]._id },
                    { amount: credit[0].amount + amount }
                  )
                  .then(credit => {
                    console.log(credit);
                    logger.info("Credit 2 updated!");
                  })
                  .catch(credit => {
                    logger.error("Error updating credit");
                  });
              })
              .catch();
          }
        })
        .catch(error => {
          logger.error(error);
        });
    } else {
      logger.info("One of your DBs is down, we cannot save your money");
    }
  }
};

module.exports = saveCredit;

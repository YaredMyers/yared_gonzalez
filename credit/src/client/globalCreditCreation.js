const CabiCredit = require("../models/CabiCredit");
const isReplicaOnline = require("../mongoDBModule2");

// backup

let saveCredit = function(amount, response) {
  if (typeof amount !== "number") {
    console.log("It has to be number");
  } else if (amount === "") {
    console.log("It has to be number");
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
                console.log("primeraguardada");

                ///////
                return CabiCredit("replica")
                  .find({})
                  .then(credit => {
                    console.log("entra");
                    if (credit.length === 0) {
                      var CreditReplic = CabiCredit("replica");
                      var myCredit = new CreditReplic({ amount });

                      myCredit
                        .save()
                        .then(credit => {
                          console.log("Todo esta guardado ahora!");
                        })
                        .catch(credit => {
                          console.log("Error GUARDANDO LA SEGUNDA");
                        });
                    } else {
                      ///// YA FINAL

                      /////////////////// ULTIMA PRUEBA

                      var CreditReplica = CabiCredit("replica");
                      var myCredit = new CreditReplica({ amount });

                      CreditReplica.findOneAndUpdate(
                        { _id: credit[0]._id },
                        { amount: credit[0].amount + amount }
                      )
                        .then(credit => {
                          console.log("Credit two updated!");
                        })
                        .catch(credit => {
                          console.log("Error updating credit");
                        });
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });

                /////////////
              })
              .catch(credit => {
                console.log("Error adding credit");
              });
          } else {
            CabiCredit("primary")
              .findOneAndUpdate(
                { _id: credit[0]._id },
                { amount: credit[0].amount + amount }
              )
              .then(credit => {
                // console.log(credit)
                console.log("Credit updated!");
              })
              .catch(credit => {
                console.log("Error updating credit");
              }); /////// AQUI EL PUTO REPLICA

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
                    console.log("Credit 2 updated!");
                  })
                  .catch(credit => {
                    console.log("Error updating credit");
                  });
              })
              .catch();
            ///////

            //////////
          }
        })
        .catch(error => {
          console.log(error);
        });

      /////////////
    } else {
      console.log("One of your DBs is down, we cannot save your money");
    }
  }
};

module.exports = saveCredit;

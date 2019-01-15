const {CabiCredit} = require("../models/CabiCredit");
// const CabiCredit2 = require("../models/CabiCredit");
// const CabiGlobalCredit = require("../models/CabiCredit"); por si se jode todo



let saveCredit = function(amount, response) {
if (typeof amount !== "number"){
  response.status(400);
  response.send("It has to be number");
} else if (amount === "") {
  response.status(400);
  response.send("It has to be number");
} else {
  const finalCredit = CabiCredit("primary")
  const newCredit = new finalCredit( {amount} );
  CabiCredit("primary").find({})
    .then(resp => {
      if (resp.length < 1) {
        newCredit.save()
        .then(resp => {
          response.status(200).send("nueva cuenta creada");
          console.log("nueva cuenta creada");
        })
        .catch(() => {
          response.status(500).send("cuenta no creada");
      console.log("cuenta no creada");
        })
      } else {
          console.log(resp)
          CabiCredit("primary").findOneAndUpdate({ _id: `${resp[0]._id}` }, { amount: resp[0].amount + amount })
          .then(resp => {
            response.status(200).send("saldo actualizado");
            console.log("saldo actualizado");
          })
          .catch(() => {
            response.status(500).send("No money updated");
            console.log("no money updated");
          });
        
        }
        })
        };
      }





      // let saveCredit = function(amount, response) {
      //   if (typeof amount !== "number"){
      //     response.status(400);
      //     response.send("It has to be number");
      //   } else if (amount === "") {
      //     response.status(400);
      //     response.send("It has to be number");
      //   } else {
      //     const newCredit = new CabiGlobalCredit({ amount });
      //     CabiGlobalCredit.find({})
      //       .then(resp => {
      //         if (resp.length < 1) {
      //           newCredit.save()
      //           .then(resp => {
      //             response.status(200).send("nueva cuenta creada");
      //             console.log("nueva cuenta creada");
      //           })
      //           .catch(() => {
      //             response.status(500).send("cuenta no creada");
      //         console.log("cuenta no creada");
      //           })
      //         } else {
      //             console.log(resp)
      //             CabiGlobalCredit.findOneAndUpdate({ _id: `${resp[0]._id}` }, { amount: resp[0].amount + amount })
      //             .then(resp => {
      //               response.status(200).send("saldo actualizado");
      //               console.log("saldo actualizado");
      //             })
      //             .catch(() => {
      //               response.status(500).send("No money updated");
      //               console.log("no money updated");
      //             });
                
      //           }
      //           })
      //           };
      //         }








module.exports = saveCredit;
// module.exports = payCredit;



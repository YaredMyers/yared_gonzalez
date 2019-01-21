const CabiCredit = require("../models/CabiCredit");

// let payCredit = function(amount) {
//   return CabiGlobalCredit.find({})
//     .then(resp => {
//       return CabiGlobalCredit.findOneAndUpdate(
//         { _id: `${resp[0]._id}` },
//         { amount: resp[0].amount - amount }
//       );
//       console.log("mensaje pagado");
//     })
// };
// // por si se jode todo
// module.exports = payCredit;

// const Credit = require("../models/UserCredit");
// ////////////////////////////////////////////////////


let payCredit = function() {
  
   CabiGlobalCredit("primary").find({})
  .then(credit => {
      console.log(credit[0].amount)
    
      var primaryCredit = CabiGlobalCredit("primary");
     
      primaryCredit.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - 100 })
      .then(credit => {
        console.log("Primary msg payed")

        CabiGlobalCredit("replica").find({})
        .then(credit2 => {
            console.log(credit2[0].amount)
          
            var CreditReplica = CabiGlobalCredit("replica");
           
            CreditReplica.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount - 100 })
            .then(credit2 => {
              console.log("Replica msg payed")
            })
            .catch(credit2 => {
              console.log("Error paying Replica! Try again")

            var primaryCredit = CabiGlobalCredit("primary");
             primaryCredit.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount + 100 })
            })
      
        })
        .catch(credit => {
          console.log("Didn't find any credit account on Replica!")
               
        })
        ////////////
      })
      .catch(credit => {
        console.log("Error paying!")
      })

  })
  .catch(credit => {
    console.log("Didn't find any credit account!")

  })
}


module.exports = payCredit;

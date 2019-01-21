
const CabiCredit = require("../models/CabiCredit");

let payCredit = function() {
  
   CabiCredit("primary").find({})
  .then(credit => {
    
    
      var CreditPrimary = CabiCredit("primary");
     
      CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - 100 })
      .then(credit => {
        console.log("Payed Primary!")

        CabiCredit("replica").find({})
        .then(credit2 => {
           
          
            var CreditReplica = CabiCredit("replica");
           
            CreditReplica.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount - 100 })
            .then(credit2 => {
              console.log("Payed Replica!")
            })
            .catch(credit2 => {
              console.log("Error paying on Replica! Retry again")

            var CreditPrimary = CabiCredit("primary");
             CreditPrimary.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount + 100 })
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

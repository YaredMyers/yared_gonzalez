// const CabiMsg = require("../models/CabiMsg");

// let saveMsg = function(msgID,status) {
  
//     var primaryMsg = CabiMsg("primary");
//     var myPrimaryMsg = new primaryMsg({msgID,destination,body,status});
    
//   return myPrimaryMsg.save()
//   .then(myMsg => {
//      console.log("guardado primary")

//     var replicaMsg = CabiMsg("replica");
//     var myReplicaMsg = new replicaMsg({msgID,destination,body,status});
    
//   myReplicaMsg.save()
//   .then(myMsg => {
//     return console.log("guardado en replica")
//   })
//   .catch(myMsg => {
//     return console.log("error guardando en replica msgcreation catch ")
//   })


//   })
//   .catch(myMsg => {
   
//     return console.log("error guardando MESSAGESAVE")
//   })
 
// }

// module.exports = saveMsg;



const CabiMsg = require("../models/CabiMsg");

let saveMsg = function(msgID, status) {
console.log(msgID)
console.log(status)
  let MessagePrimary = CabiMsg("primary");

  MessagePrimary.findOneAndUpdate({msgID: msgID}, { "status" : status }) 
      .then(messageP => {
        console.log(messageP, "GUAY")
      console.log("PENDING ---> OK, TIMEOUT, ERROR")
      })
      .catch(error => {
        console.log(error)
        console.log("Error Primary: PENDING ---> OK, TIMEOUT, ERROR")
      })

      
  let MessageReplica = CabiMsg("replica");
    
  MessageReplica.findOneAndUpdate({msgID: msgID}, { "status" : status }) 
  .then(messageP => {

  console.log("PENDING ---> OK, TIMEOUT, ERROR")
  })
  .catch(console.log("Error Replica: PENDING ---> OK, TIMEOUT, ERROR"))
 
}

module.exports = saveMsg;
const CabiMsg = require("../models/CabiMsg");

let saveMsg = function(msgID, status) {
  
    var primaryMsg = CabiMsg("primary");
    var myPrimaryMsg = new primaryMsg({msgID,destination,body,status});
    
  return myPrimaryMsg.save()
  .then(myMsg => {
     console.log("guardado primary")

    var replicaMsg = CabiMsg("replica");
    var myReplicaMsg = new replicaMsg({msgID,destination,body,status});
    
  myReplicaMsg.save()
  .then(myMsg => {
    return console.log("guardado en replica")
  })
  .catch(myMsg => {
    return console.log("error guardando en replica")
  })


  })
  .catch(myMsg => {
   
    return console.log("error guardando MESSAGESAVE")
  })
 
}

module.exports = saveMsg;
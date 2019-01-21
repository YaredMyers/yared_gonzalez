const CabiMsg = require("../models/CabiMsg");

let pendingMessageSave = function(messageObj) {
  

let PrimaryMsg = CabiMsg('primary');
let myMessagePrimary = new PrimaryMsg(messageObj);

 myMessagePrimary.save()
.then(myMessage => {
 console.log("guardado PENDING en primary")

})
.catch(myMessage => {
  console.log(myMessage, "este me interesa")
 console.log("error guardando PENDING en primary")
})

let ReplicaMsg = CabiMsg("replica");
let myMessageReplica = new ReplicaMsg(messageObj);

return myMessageReplica.save()
.then(myMessage => {
 console.log("guardado PENDING en replica")
})
.catch(myMessage => {
return console.log("error guardando PENDING en replica")
})

}

module.exports = pendingMessageSave
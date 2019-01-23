const Queue = require("bull");
// const pendingMessageSave = require("../client/PendingMsg");
// const clientMessageApp = require("../messageAppAxios/clientMessageApp");
// const saveMsg = require("../client/msgCreation");
// const addToMyCreditQueue = require('../../../credit/src/qeuesCredit');
// const payCredit = require("../../../credit/src/validations/payCredit");
// const locks = require("locks");
// const mutex = locks.createMutex();
const clientMessageApp = require('../messageAppAxios/clientMessageApp');
const saveMsg = require('../client/msgCreation');
//creo la cola:
const messageQueue = new Queue("messageQueue");
const creditQueue = new Queue("creditQueue"); //addToMyCreditQueue
const uuidv4 = require("uuid/v4");

// console.log("entra en queues 3.1")

messageQueue.process(function(job, done) {
  // console.log("entra en queues 3.2 process")
  
  
  if (job.data.type === "Check my Credit" && job.data.statuCredit === "STATUS: NO") {
    
    console.log("no hay credito")
    done()
    
  } else if (job.data.type === "Check my Credit" && job.data.statuCredit === "STATUS: OK") {
    console.log(job.data, "**********")
    
    const msgID = job.data.message.msgID;
    const destination = job.data.message.destination;
    const body = job.data.message.body;
    
    // console.log(job.data, "dentro process")


    return clientMessageApp(msgID, destination, body)
    .then(resp => {
      console.log("ENTRA EN STAT OK")
      let status = "STATUS: OK";
      return saveMsg(msgID, status);
    })
    .catch(e => {
      let status;
      if (e.response === undefined) {
        status = "STATUS: TIMEOUT";
      } else {
        status = "STATUS: NO";
      }
      // console.log(job.data, "dentro process")

      saveMsg(msgID, status).then(() => done())
     });
  // });

  } else {
console.log("no enviado")

  }





// let addToMyQueue = function(req, res, next) {
//   const msgID = uuidv4();
//   const messageObj = {
//     msgID: msgID,
//     destination: req.body.destination,
//     body: req.body.body,
//     status: "STATUS: PENDING"
//   };

//   return pendingMessageSave(messageObj)
//     .then(() => {
//       console.log("entra por pending msgs then")
//       return creditQueue.add(messageObj);
//     })
//     .then(() => {
//       return res.send(`processing your message ${messageObj.msgID}`);
//     });
// });
// })
})

module.exports = {messageQueue, creditQueue}

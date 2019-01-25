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
const messageQueue = new Queue("messageQueue", 'redis://yared_gonzalez_redis_1:6379');
const creditQueue = new Queue("creditQueue", 'redis://yared_gonzalez_redis_1:6379'); //addToMyCreditQueue
const uuidv4 = require("uuid/v4");
const breaker = require('../messageAppAxios/circuitBreaker')


messageQueue.process(function(job, done) {
  // console.log("entra en queues 3.2 process")
  
  if (job.data.type === "Check my Credit" && job.data.status === "STATUS: NO") {
    console.log("no hay credito")
    done()
    
  } else if (job.data.type === "Check my Credit" && job.data.status === "STATUS: OK") {
    
    const msgID = job.data.message.msgID;
    const destination = job.data.message.destination;
    const body = job.data.message.body;
    
    // console.log(job.data, "dentro process")
    
    
    return breaker.fire(destination, body)
    .then(resp => {
      console.log(resp, "RESP EN COLA")
      let status = resp;
      return saveMsg(msgID, status);
    })
    .catch(e => {
      let status;
      console.log(e.message, "El DEL CATCH")
      if (e.response === undefined) {
        return status = e;
      } else {
        return status = e;
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

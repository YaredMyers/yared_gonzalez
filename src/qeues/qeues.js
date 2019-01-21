const Queue = require('bull');
const pendingMessageSave = require('../client/PendingMsg')
const clientMessageApp = require('../messageAppAxios/clientMessageApp')
const saveMsg = require('../client/msgCreation')
const payCredit = require('../validations/payCredit')
const locks = require("locks");
const mutex = locks.createMutex();

//creo la cola:
const messageQueue = new Queue('messageQueue');
const uuidv4 = require('uuid/v4');

messageQueue.process(function(job,done){

  const msgID = job.data.msgID;
  const destination = job.data.destination;
  const body = job.data.body;
 
  clientMessageApp(msgID, destination, body)
    .then(resp => {

      let status = "STATUS: OK";
      saveMsg(msgID, status);
    })
    .then(resp => {
      mutex.lock(function() {
        payCredit()
        mutex.unlock()
        .then(resp => {
            done();
            console.log("entra en el then OK de ques")
            console.log("STATUS: OK. msg paid good :)");
          })
          .catch(e => {
            done();
            mutex.unlock();              
          })
      });
    })
    .catch(e => {
      // console.log(e);
      if (e.response === undefined) {
        let status = "STATUS: TIMEOUT";
        saveMsg(msgID, status);
        console.log("STATUS: TIMEOUT");
      } else {
        let status = "STATUS: NO";
        saveMsg(msgID, status);
        console.log("Msg saved, but external request failed");
      }
      done();
    });

 })

let addToMyQueue = function(req,res,next) { 
  const msgID = uuidv4()
  const messageObj = {
    msgID: msgID,
    destination: req.body.destination,
    body: req.body.body,
    status: "STATUS: PENDING",
  }

  return pendingMessageSave(messageObj)
    .then(() => {
      return messageQueue.add(messageObj)
    })
    .then(() => {
      return res.send(`processing your message ${messageObj.msgID}`)
    })
  // console.log(messageObj)
} 

// messageQueue.on('completed', function(job, result){
  // console.log("TRABAJO DE LA COLA HECHO")
// })


module.exports = addToMyQueue;
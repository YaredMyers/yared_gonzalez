const Queue = require('bull');
const pendingMessageSave = require('../client/PendingMsg')
const clientMessageApp = require('../messageAppAxios/clientMessageApp')
const saveMsg = require('../client/msgCreation')
const payCredit = require('../validations/payCredit')

//creo la cola:
const messageQueue = new Queue('messageQueue');
const uuidv4 = require('uuid/v4');

messageQueue.process(function(job,done){

  const msgID = job.data.msgID;
  const destination = job.data.destination;
  const body = job.data.body;
 
  clientMessageApp(destination, body)
      .then(resp => {
        var status = "STATUS: OK";
        return saveMsg(destination, body, status);
      })
      .then(resp => {
        mutex.lock(function() {
          console.log("We got the lock!");
          payCredit(100)
            .then(resp => {
              mutex.unlock();
              console.log("STATUS: OK. msg paid good :)");
            })
            .catch(e => {
              mutex.unlock();
              
            })

            .catch(e => {
              console.log(e);
            });
        });
      })
      .catch(e => {
        console.log(e);
        if (e.response === undefined) {
          var status = "STATUS: TIMEOUT";
          saveMsg(destination, body, status);
          console.log("STATUS: TIMEOUT");
        } else {
          var status = "STATUS: NO";
          saveMsg(destination, body, status);
          console.log("Msg saved, but external request failed");
        }
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

pendingMessageSave(messageObj)
// console.log(messageObj)

messageQueue.add(messageObj)
 res.send(`processing your message ${messageObj.msgID}`)

} 

messageQueue.on('completed', function(job, result){
  console.log("TRABAJO DE LA COLA HECHO")
})


module.exports = addToMyQueue;
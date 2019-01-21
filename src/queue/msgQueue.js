const Queue = require('bull');
const pendingSaveMsg = require('../clients/pendingMessageSave') //pendiente
const clientMessageApp = require('../messageAppAxios/clientMessageApp')
const saveMsg = require('../client/msgCreation')
const payCredit = require('../validations/payCredit')

//creo la cola:
const myMsgQueue = new Queue('myMsgQueue');
const uuidv1 = require('uuid/v1');

myMsgQueue.process(function(job,done){

  const _id = job.data.msgID;
  const destination = job.data.destination;
  const body = job.data.body;
 
  clientMessageApp(_id, destination, body)
   .then(resp => {
 
     let status = "STATUS: OK"
     saveMsg(_id, destination, body, status)
     .then(payCredit()) 
     .catch(console.log("error saving msg"))
 
   })
   .catch(resp => {
 
     if (resp.status === undefined) {
       let status = "STATUS: TIMEOUT"
       saveMsg(myId, destination, body, status)
    
       console.log('TIMEOUT BITCH')
     } else {
       let status = "STATUS: NO"
       saveMsg(myId, destination, body, status)
 
       console.log('Couldnt save the msg')
     }
 
   })
   .then(done())
   .catch(done());
 
 })


let addToQueue = function(req,res,next) { 

const myMsgObj = {
  _id: uuidv1(),
  destination: req.body.destination,
  body: req.body.body,
  status: "STATUS: PENDING",
}

pendingSaveMsg(myMsgObj)

myMsgQueue.add(myMsgObj)
 res.send(`processing your message ${myMsgObj.msgID}`)
} 

module.exports = addToQueue;
const Queue = require("bull");

const checkCredit = require('../validations/creditValidation');

const payCredit = require('../validations/payCredit')
const creditQueue = new Queue("creditQueue");
const messageQueue = new Queue("messageQueue");

const uuidv4 = require("uuid/v4");

// console.log("credit pro 1")

// console.log("creditqueues 4.1")
creditQueue.process(function(job,done){
  // console.log("credit pro 2")

  // console.log("creditqueues 4.2")
  // console.log(job.data, "CREDIT")
 checkCredit(job)
.then(checkMyCabiCredit => {
  console.log("credit pro 3")

  console.log(checkMyCabiCredit, "IMPORTANTE")
  console.log("credit pro 4")

  if(checkMyCabiCredit.statusCredit === "STATUS: OK") {
    console.log("credit pro 4")

    payCredit().then(()=> 
      messageQueue.add(checkMyCabiCredit)
    )
    .then(done)
  }
})

})


// creditQueue.process(function(job, done) {
  // const msgID = job.data.msgID;
  // const destination = job.data.destination;
  // const body = job.data.body;

//   clientMessageApp(msgID, destination, body)
//     .then(resp => {
//       let status = "STATUS: OK";
//       return saveMsg(msgID, status);
//     })
//     .then(resp => {
//       return payCredit()
//         .then(resp => {
//           done();
//           console.log("STATUS: OK. msg paid good :)");
//         })
//         .catch(e => {
//           done();
//         });
//     })
//     .catch(e => {
//       let status;
//       if (e.response === undefined) {
//         status = "STATUS: TIMEOUT";
//       } else {
//         status = "STATUS: NO";
//       }
//       console.log(status);
//       saveMsg(msgID, status).then(() => done());
//     });
// });

// let addToMyCreditQueue = function(req, res, next) {
  // const msgID = uuidv4();
  // const messageObj = {
  //   msgID: msgID,
  //   destination: req.body.destination,
  //   body: req.body.body,
  //   status: "STATUS: PENDING"
  // };

  // return pendingMessageSave(messageObj)
  //   .then(() => {
  //     return creditQueue.add(messageObj);
  //   })
  //   .then(() => {
  //     return res.send(`processing your message ${messageObj.msgID}`);
  //   });
// };

module.exports = {creditQueue, messageQueue};
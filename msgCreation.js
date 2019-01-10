const CabiMsg = require ("./models/CabiMsg.js");

let saveMsg = function(destination, body) {
  // const destination = req.body.destination;
  // const body = req.body.body;
  const newMsg = new CabiMsg({destination, body})
  newMsg.save()
  console.log("ENTRA SAVE")

      // .then(() => {
      //   console.log("Msg successfully created :)");
      //   // response.status(200).json({ message: 'Msg successfully created :)' })
      // })
      // .catch(() => {
      //   console.log("Brah, keep trying, there is a reward for you xD");
      //   // response.status(500).json({ message: 'Brah, keep trying, there is a reward for you xD' })
      // })
}

module.exports = saveMsg;
const axios = require("axios");
const axiosMessageApp = process.env.AxiosREQ;

let clientMessageApp = function(destination, body) {
  return axios.post(axiosMessageApp, { destination, body }, { timeout: 8000 })
  .then((resp)=> {
    // console.log(resp)
    throw ("OK");
  })
  .catch((e)=> {
    if(e.message === undefined) {
      throw new Error ("TIMEOUT");
    } else {
      throw ("CircuitBreaker is Open Now");
    }
  })
};



module.exports = clientMessageApp;

const axios = require("axios");

function client(destination,body) {
  return axios.post("http://localhost:9001/messages", {destination, body});
};

client("", "")
  .then(resp => {
    console.log("FAIL"); 
    // Quiero que devuelva un error 500 y un mensaje de error:
    // "Necesita body y destination"
  })
  .catch(e => {
    console.log("OK")
  });

client(1, 1)
  .then(resp => {
    console.log("OK"); 
  })
  .catch(e => {
    console.log("FAIL: Destination && body must be strings")
    // falta mensaje error: destination no puede ser un numero
  })


  client(null, undefined)
  .then(resp => {
    console.log("OK"); 
  })
  .catch(e => {
    console.log("FAIL: destination && body must be strings")
    // falta mensaje de error: body no puede ser un numero
  })

  client("destination", "ImaginaQueEstoEsMuyLargo")
  .then(resp => {
    console.log("FAIL: destination length && body length must be under 20 characters")
    // hay que limitar numero de caracteres en destination y en body
    //if(destination.length > 20 || body.length > 20)...
  })
  .catch(e => {
    console.log("OK")
  })


  client("🤔", "😍")
  .then(resp => {
    console.log("FAIL: body or destination cannot be emojis strings")
    // hay que limitar que se pongan caracteres como / * ^ o emoticonos.
  })
  .catch(e => {
    console.log("OK")
  })
  

  client([], {})
  .then(resp => {
    console.log("OK")
  })
  .catch(e => {
    console.log("FAIL: destination or body cannot be objects or arrays")
    // mensaje si se pone [] o {}
  })

  client(true, false)
  .then(resp => {
    console.log("OK")
  
  })
  .catch(e => {
    console.log("FAIL: destination or body cannot be booleans")
    // mensaje si se pone true / false
  })
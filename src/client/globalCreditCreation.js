const CabiCredit = require("../models/CabiCredit");
const {isReplicaOnline} = require('../mongoDBModule2');

  // backup

  let saveCredit = function(amount, response) {
    if (typeof amount !== "number"){
      response.status(400);
      response.send("It has to be number");
    } else if (amount === "") {
      response.status(400);
      response.send("It has to be number");
    } else {
    
      if (isReplicaOnline){
        
        return CabiCredit("primary").find({})
        .then(credit => {
        if(credit.length === 0){
    
          var CreditPrimary = CabiCredit("primary");
          var myCredit = new CreditPrimary({amount});
          
        myCredit.save()
        .then(credit => {
           console.log("Primera DB credit creada");
           
           ///////
           return CabiCredit("replica").find({})
           .then(credit => {
             console.log("entra por then de replica")
           if(credit.length === 0){
       
             var CreditReplic = CabiCredit("replica");
             var myCredit = new CreditReplic ({amount});
             
       
           myCredit.save()
           .then(credit => {
            
             response.status(200).send("Segunda y primera DB credit Creadas")
     
           })
           .catch(credit => {
             response.status(500).send("Error creando la segunda")
           })
       
           } 
           
           else { 
            /////////////////// ULTIMA PRUEBA
            var CreditReplica = CabiCredit("replica");
             var myCredit = new CreditReplica({amount});
    
             CreditReplica.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
             .then(credit => {
       
               response.status(200).send("Credit DB two updated!")
             })
             .catch(credit => {
               response.status(500).send("Error updating DB two credit")
             })
       
           }
         })
         .catch(error => {
           console.log(error)
         })
         
    
    
           /////////////
       
    
        })
        .catch(credit => {
          response.status(500).send("Error adding credit")
        })
    
        } 
        else {
    
        
          CabiCredit("primary").findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
          .then(credit => {
           response.status(200).send("Credit DB one and two updated!")
          })
          .catch(credit => {
           response.status(500).send("Error updating DB one credit")
          }) /////// AQUI LA PUTO REPLICA

          CabiCredit("replica").find({})
          .then(credit => {

            CabiCredit("replica").findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
            .then(credit => {
              console.log(credit)
               response.status(200).send("Credit 2 updated!")
            })
            .catch(credit => {
             response.status(500).send("Error updating credit")
            })

          })  
          .catch(error)        
       ///////
    
          //////////
        }
      })
      .catch(error => {
        console.log(error)
      })
    
    
    
    
    
    /////////////
    
    
        
        
      } else {
        res.status(408).send("One of your DataBases is down, you cannot save your money")
              
              }
              
              };
            }
    
      














      // ESTE BACKUP NO SE TOCA JAMAS 

  //     // backup

  // let saveCredit = function(amount, response) {
  //   if (typeof amount !== "number"){
  //     response.status(400);
  //     response.send("It has to be number");
  //   } else if (amount === "") {
  //     response.status(400);
  //     response.send("It has to be number");
  //   } else {
    
  //     if (isReplicaOnline){
        
  //       return CabiCredit("primary").find({})
  //       .then(credit => {
  //       if(credit.length === 0){
    
  //         var CreditPrimary = CabiCredit("primary");
  //         var myCredit = new CreditPrimary({amount});
          
  //       myCredit.save()
  //       .then(credit => {
  //          console.log("Primera DB creada");
           
  //          ///////
  //          return CabiCredit("replica").find({})
  //          .then(credit => {
  //            console.log("entra por then de replica")
  //          if(credit.length === 0){
       
  //            var CreditReplic = CabiCredit("replica");
  //            var myCredit = new CreditReplic ({amount});
             
       
  //          myCredit.save()
  //          .then(credit => {
            
  //            response.status(200).send("Segunda y primera DB Creadas")
     
  //          })
  //          .catch(credit => {
  //            response.status(500).send("Error creando la segunda")
  //          })
       
  //          } 
           
  //          else { 
  //           /////////////////// ULTIMA PRUEBA
  //           var CreditReplica = CabiCredit("replica");
  //            var myCredit = new CreditReplica({amount});
    
  //            CreditReplica.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
  //            .then(credit => {
       
  //              response.status(200).send("Credit DB two updated!")
  //            })
  //            .catch(credit => {
  //              response.status(500).send("Error updating DB two credit")
  //            })
       
  //          }
  //        })
  //        .catch(error => {
  //          console.log(error)
  //        })
         
    
    
  //          /////////////
       
    
  //       })
  //       .catch(credit => {
  //         response.status(500).send("Error adding credit")
  //       })
    
  //       } 
  //       else {
    
        
  //         CabiCredit("primary").findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
  //         .then(credit => {
  //          response.status(200).send("Credit DB one updated!")
  //         })
  //         .catch(credit => {
  //          response.status(500).send("Error updating DB one credit")
  //         }) /////// AQUI LA PUTO REPLICA

  //         CabiCredit("replica").find({})
  //         .then(credit => {

  //           CabiCredit("replica").findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
  //           .then(credit => {
  //             console.log(credit)
  //              response.status(200).send("Credit 2 updated!")
  //           })
  //           .catch(credit => {
  //            response.status(500).send("Error updating credit")
  //           })

  //         })  
  //         .catch(error)        
  //      ///////
    
  //         //////////
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
    
    
    
    
    
  //   /////////////
    
    
        
        
  //     } else {
  //       res.status(408).send("One of your DataBases is down, you cannot save your money")
              
  //             }
              
  //             };
  //           }




module.exports = saveCredit;
// module.exports = payCredit;



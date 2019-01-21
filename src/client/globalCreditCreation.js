const CabiCredit = require("../models/CabiCredit");
const isReplicaOnline = require('../mongoDBModule2');

  // backup

  let saveCredit = function(amount, response) {
    if (typeof amount !== "number"){
      console.log("It has to be number");
    } else if (amount === "") {
      console.log("It has to be number");
    } else {
    
      if (isReplicaOnline){
        
        return CabiCredit("primary").find({})
        .then(credit => {
        if(credit.length === 0){
    
          var CreditPrimary = CabiCredit("primary");
          var myCredit = new CreditPrimary({amount});
          
        myCredit.save()
        .then(credit => {
           console.log("primeraguardada");
           
           ///////
           return CabiCredit("replica").find({})
           .then(credit => {
             console.log("entra")
           if(credit.length === 0){
       
             var CreditReplic = CabiCredit("replica");
             var myCredit = new CreditReplic ({amount});
             
       
           myCredit.save()
           .then(credit => {
            
             console.log("Todo esta guardado ahora!")
     
           })
           .catch(credit => {
            console.log("Error GUARDANDO LA SEGUNDA")
           })
       
           } 
           
           else { ///// YA FINAL
    
            
           
    
            /////////////////// ULTIMA PRUEBA
    
    
            var CreditReplica = CabiCredit("replica");
             var myCredit = new CreditReplica({amount});
    
             CreditReplica.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
             .then(credit => {
       
               console.log("Credit two updated!")
             })
             .catch(credit => {
              console.log("Error updating credit")
             })
       
           }
         })
         .catch(error => {
           console.log(error)
         })
         
    
    
           /////////////
       
    
        })
        .catch(credit => {
          console.log("Error adding credit")
        })
    
        } 
        else {
    
        
          CabiCredit("primary").findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
          .then(credit => {
            // console.log(credit)
            console.log("Credit updated!")
          })
          .catch(credit => {
            console.log("Error updating credit")
          }) /////// AQUI EL PUTO REPLICA

          CabiCredit("replica").find({})
          .then(credit => {

            CabiCredit("replica").findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
            .then(credit => {
              console.log(credit)
               console.log("Credit 2 updated!")
            })
            .catch(credit => {
              console.log("Error updating credit")
            })

          })  
          .catch()        
       ///////
            
    
    
    
    
    
          //////////
        }
      })
      .catch(error => {
        console.log(error)
      })
    
    
    
    
    
    /////////////
    
    
        
        
      } else {
        console.log("One of your DBs is down, we cannot save your money")
              
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
  //          console.log("primeraguardada");
           
  //          ///////
  //          return CabiCredit("replica").find({})
  //          .then(credit => {
  //            console.log("entra")
  //          if(credit.length === 0){
       
  //            var CreditReplic = CabiCredit("replica");
  //            var myCredit = new CreditReplic ({amount});
             
       
  //          myCredit.save()
  //          .then(credit => {
            
  //            console.log.send("Todo esta guardado ahora!")
     
  //          })
  //          .catch(credit => {
  //            response.status(500).send("Error GUARDANDO LA SEGUNDA")
  //          })
       
  //          } 
           
  //          else { ///// YA FINAL
    
            
           
    
  //           /////////////////// ULTIMA PRUEBA
    
    
  //           var CreditReplica = CabiCredit("replica");
  //            var myCredit = new CreditReplica({amount});
    
  //            CreditReplica.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
  //            .then(credit => {
       
  //              console.log.send("Credit two updated!")
  //            })
  //            .catch(credit => {
  //              response.status(500).send("Error updating credit")
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
    
  //           console.log.send("Credit updated!")
  //         })
  //         .catch(credit => {
  //           response.status(500).send("Error updating credit")
  //         }) ///////
            
    
    
    
    
    
  //         //////////
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
    
    
    
    
    
  //   /////////////
    
    
        
        
  //     } else {
  //       const finalCredit = CabiCredit("primary")
  //       const newCredit = new finalCredit( {amount} );
  //       CabiCredit("primary").find({})
  //         .then(resp => {
  //           if (resp.length < 1) {
  //             newCredit.save()
  //             .then(resp => {
  //               console.log.send("nueva cuenta creada");
  //               console.log("nueva cuenta creada");
  //             })
  //             .catch(() => {
  //               response.status(500).send("cuenta no creada");
  //           console.log("cuenta no creada");
  //             })
  //           } else {
  //               console.log(resp)
  //               CabiCredit("primary").findOneAndUpdate({ _id: `${resp[0]._id}` }, { amount: resp[0].amount + amount })
  //               .then(resp => {
  //                 console.log.send("saldo actualizado");
  //                 console.log("saldo actualizado");
  //               })
  //               .catch(() => {
  //                 response.status(500).send("No money updated");
  //                 console.log("no money updated");
  //               });
              
  //             }
  //             })
  //             };
  //           }
    
  //     }





module.exports = saveCredit;
// module.exports = payCredit;



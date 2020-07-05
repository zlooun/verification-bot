"use strict";




const handler = (idRecipient, idRequest) => {
  
  const sendObj = {
    idRecipient,
    idRequest
  }

  global.redis.publish("recipient", JSON.stringify(sendObj));

};




module.exports = handler;

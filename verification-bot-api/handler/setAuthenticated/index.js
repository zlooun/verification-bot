"use strict";




const handler = () => {

  return new Promise((resolve, reject) => {

    const findObj = {
      "isAuthenticated": true
    };
  
    global.mongoModels.User.find(findObj)
    .then((array) => {

      if (array) {

        global.redis.del("queue")
        .then(() => {
    
          array.forEach((item) => {
    
            global.session.set(`${item.idUserTelegram}:${item.idChatTelegram}`, item);
    
          });
          
          array.filter((item) => !!item.notifications).forEach((item, index) => {
            
            global.redis.hset("queue", item.idUserTelegram, index === 0);
    
          });
    
          resolve();
    
        }, (err) => reject(err));

      }
  
    }, (err) => reject(err));

  });

};




module.exports = handler;

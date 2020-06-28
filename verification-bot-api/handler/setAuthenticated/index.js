"use strict";




const handler = () => {

  const findObj = {
    "isAuthenticated": true
  };


  global.mongoModels.User.find(findObj, (err, array) => {

    if (err) {
      console.log(err);
      return;
    }

    if (!array) {
      console.log("Нет аутинтифицированных пользователей.");
      return;
    }

    global.redis.del("queue")
    .then(() => {

      array.forEach((item, index) => {

        global.session.set(`${item.idUserTelegram}:${item.idChatTelegram}`, item, index == 0 ? true : false);

      })
      
      array.filter((item) => item.notifications ? true : false).forEach((item, index) => {
        
        global.redis.hset("queue", item.idUserTelegram, index == 0 ? true : false);

      });

    });

  });

};




module.exports = handler;

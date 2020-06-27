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

    array.forEach((item, index, array) => {

      global.session.set(`${item.idUserTelegram}:${item.idChatTelegram}`, item, index == 0 ? true : false);
      
      if (item.notifications) {

        global.redis.hset("queue", item.idUserTelegram, index == 0 ? true : false);
      
      }
      
    });

  });

};




module.exports = handler;

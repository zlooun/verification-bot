"use strict";




const log = `[BOT][SYSTEM] - - [${__dirname.slice(49)}]`;


const handler = () => {

  const findObj = {
    "isAuthenticated": true
  };

  winston.info(`${log} - - Поиск пользователя в бд.`);
  global.mongoModels.User.find(findObj, (err, array) => {

    if (err) {
      winston.info(`${log} - - ${err}`);
      return;
    }

    if (!array) {
      winston.info(`${log} - - Нет аутинтифицированных пользователей.`);
      return;
    }

    winston.info(`${log} - - Удаление старой очереди.`);
    global.redis.del("queue")
    .then(() => {

      winston.info(`${log} - - Установка сессии для каждого авторизированного пользователя.`);
      array.forEach((item, index) => {

        global.session.set(`${item.idUserTelegram}:${item.idChatTelegram}`, item);

      })
      
      winston.info(`${log} - - Создание очереди из тех, у кого включены уведомления.`);
      array.filter((item) => item.notifications ? true : false).forEach((item, index) => {
        
        global.redis.hset("queue", item.idUserTelegram, index == 0 ? true : false);

      });

      winston.info(`${log} - - Установка очереди и сессии завершена.`);

    });

  });

};




module.exports = handler;

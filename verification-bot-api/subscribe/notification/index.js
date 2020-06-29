"use strict";




const handler = (channel, message) => {
  const log = `[BOT][EXPRESS] - - [${__dirname.slice(49)}]`;
  winston.info(`${log} - - Бот получил запрос через redis от express.`);

  if (channel === "notification") {
    winston.info(`${log} - - Запрос на отправку уведомления.`);

    message = JSON.parse(message);

    const newMessage = `Имя: ${message.name}\n` +
    `Фамилия: ${message.lastname ? message.lastname : "отсутствует"}\n` +
    `Логин: ${message.login}`;

    winston.info(`${log} - - Получаем всю очередь из redis.`);
    global.redis.hgetall("queue")
    .then((queue) => {

      if (!Object.values(queue).length){
        winston.info(`${log} - - Очердь пуста, ничего не делаем.`);
        return;
      }

      winston.info(`${log} - - Очердь не пуста.`);

      queue = Object.entries(queue);


      winston.info(`${log} - - Ищем пользователя, чья очередь сейчас на отправку уведомления.`);
      for (let i = 0; i < queue.length; i++) {
        
        const turn = queue[i];

        if (turn[1] === "true") {
          winston.info(`${log} - - Пользователь найден.`);

          winston.info(`${log} - - Отправляем ему сообщение.`);
          global.telegram.sendMessage(turn[0], newMessage);

          winston.info(`${log} - - Убираем очередь пользователя на отправку уведомления.`);
          global.redis.hset("queue", turn[0], false);

          winston.info(`${log} - - Проверяем был ли пользователь не один в очереди.`);
          if (i === queue.length - 1) {
            winston.info(`${log} - - Пользователь был не один в очереди.`);

            winston.info(`${log} - - Назначаем первого пользователя из очереди следующим в очереди для получения уведомления.`);
            global.redis.hset("queue", queue[0][0], true);
            break;
          }

          winston.info(`${log} - - Пользователь был не последним в очереди.`);

          winston.info(`${log} - - Назначаем следующего пользователя в очереди следующим для получения уведомления.`);
          global.redis.hset("queue", queue[i + 1][0], true);
          break;
        }

      }

    }, (err) => winston.info(`${log} - - ${err}`));

  }
    
};




module.exports = handler;

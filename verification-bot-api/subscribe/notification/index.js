"use strict";




const dirname = path.relative(process.cwd(), __dirname);


const handler = (channel, message) => {
  const log = `[BOT][EXPRESS] - - [${dirname}]`;

  if (channel === "notification") {
    winston.info(`${log} - - Бот получил запрос на отправку уведомления.`);

    message = JSON.parse(message);
    
    const newMessage = `Следующий клиент ожидает верификацию:\n` +
    `${message.name ? `Имя: ${message.name}\n` : ""}` +
    `${message.lastname ? `Фамилия: ${message.lastname}\n` : ""}` +
    `${message.login ? `Логин: ${message.login}\n` : ""}` +
    `${message.project ? `Проект: ${message.project}\n` : ""}` +
    `${message.fromServer ? `Сервер: ${message.fromServer}\n` : ""}` +
    `${message.link ? `Ссылка: ${message.link}\n` : ""}`;

    global.redis.hgetall("queue")
    .then((queue) => {

      if (!Object.values(queue).length){
        winston.warn(`${log} - - Очердь пуста, некому отправить уведомление.`);
        return;
      }


      queue = Object.entries(queue);

      for (let i = 0; i < queue.length; i++) {
        
        const turn = queue[i];

        if (turn[1] === "true") {

          winston.info(`${log} - - Отправляем уведомление пользователю.`);
          global.telegram.sendMessage(turn[0], newMessage);
          global.handler.setRecipient(turn[0], message._id);

          global.redis.hset("queue", turn[0], false)
          .catch((err) => winston.error(`${log} - - ${err}`));

          if (i === queue.length - 1) {
            global.redis.hset("queue", queue[0][0], true)
            .catch((err) => winston.error(`${log} - - ${err}`));
            break;
          }

          global.redis.hset("queue", queue[i + 1][0], true)
          .catch((err) => winston.error(`${log} - - ${err}`));
          break;
        }

      }

    }, (err) => winston.error(`${log} - - ${err}`));

  }
    
};




module.exports = handler;

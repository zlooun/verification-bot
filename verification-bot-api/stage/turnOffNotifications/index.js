"use strict";



const keyboards = global.keyboards;
const Scene = require('telegraf/scenes/base');

const dirname = path.relative(process.cwd(), __dirname);

const handler = () => {

  const turnOffNotifications = new Scene('turnOffNotifications');

  turnOffNotifications.enter((ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;

    global.session.get(ctx.sessionKey)
    .then((session) => {

      if (!Object.keys(session).length) {
        winston.info(`${log} - - Пользователь не авторизирован.`);
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        global.listAnswer.notAuthenticated(ctx.from)
        .then((str) => ctx.reply(str, keyboards.authorization));
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      winston.info(`${log} - - Пользователь авторизирован.`);

      global.redis.hexists("queue", ctx.from.id)
      .then((result) => {

        if (!result) {
          winston.info(`${log} - - Уведомления у пользователя отключены.`);
          winston.info(`${log} - - Отправляем ответ пользователю.`);
          ctx.reply("У вас уже отключены уведомления.", keyboards.turnOn);
          winston.info(`${log} - - Покидаем сцену.`);
          ctx.scene.leave();
          return;
        }
  
        winston.info(`${log} - - Уведомления у пользователя включены.`);
  
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply(`Вы уверены, что хотите отключить уведомления? (Введите "Да" или "Нет")`, keyboards.yesNo);
  
      }, (err) => winston.error(`${log} - - ${err}`));

    }, (err) => winston.error(`${log} - - ${err}`));

  });

  turnOffNotifications.hears(/^(✅ )?Да$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел "${ctx.update.message.text}".`);

    global.mongoModels.User.findOneAndUpdate({"idUserTelegram": ctx.from.id}, { "notifications": false }, { new : true })
    .then((user) => {

      if (!user) {
        winston.warn(`${log} - - Пользователь не обновился в бд.`);
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply("Ошибка.", keyboards.turnOn);
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      global.session.set(ctx.sessionKey, user).then(() => global.redis.hget("queue", ctx.from.id), (err) => winston.error(`${log} - - ${err}`))
      .then((turn) => {
  
        if (turn === "false") {
  
          global.redis.hdel("queue", ctx.from.id)
          .then((result) => {
  
            if (result) {
              winston.info(`${log} - - Пользователь удален из очереди. Уведомления отключены.`);
              winston.info(`${log} - - Отправляем ответ пользователю.`);
              ctx.reply("Уведомления отключены.", keyboards.turnOn);
  
              winston.info(`${log} - - Покидаем сцену.`);
              ctx.scene.leave();
              return;
            }
  
            winston.warn(`${log} - - Пользователь не удалился из очереди. WHAT?`);
            winston.info(`${log} - - Отправляем ответ пользователю.`);
            ctx.reply("Вы не удалились из очереди.WHAT?.", keyboards.turnOn);
  
            winston.info(`${log} - - Покидаем сцену.`);
            ctx.scene.leave();
  
          });
  
          return;
        }
  
        global.redis.hgetall("queue").then((queue) => {
  
          queue = Object.entries(queue);
    
          for (let i = 0; i < queue.length; i++) {
            
            const turn = queue[i];
    
            if (turn[1] === "true") {
    
              global.redis.hdel("queue", ctx.from.id)
              .then((result) => {
      
                if (result) {
                  winston.info(`${log} - - Пользователь удалился из очереди. Уведомления выключены.`);
                  winston.info(`${log} - - Отправляем ответ пользователю.`);
                  ctx.reply("Уведомления отключены.", keyboards.turnOn);
                  winston.info(`${log} - - Покидаем сцену.`);
                  ctx.scene.leave();
                  return;
                }
      
                winston.warn(`${log} - - Пользователь не удалился из очереди.WHAT?.`);
                winston.info(`${log} - - Отправляем ответ пользователю.`);
                ctx.reply("Вы не удалились из очереди.WHAT?.", keyboards.turnOn);
                winston.info(`${log} - - Покидаем сцену.`);
                ctx.scene.leave();
      
              }, (err) => winston.error(`${log} - - ${err}`));
    
              if (queue.length !== 1) {
    
                if (i === queue.length - 1) {
                  global.redis.hset("queue", queue[0][0], true).catch((err) => winston.error(`${log} - - ${err}`));
                  return;
                }
                
                global.redis.hset("queue", queue[i + 1][0], true).catch((err) => winston.error(`${log} - - ${err}`));
                return;
    
              }
    
              return;
    
            }
    
          }
    
        }, (err) => winston.error(`${log} - - ${err}`));
  
      }, (err) => winston.error(`${log} - - ${err}`));
      
    }, (err) => winston.error(`${log} - - ${err}`));
    
  }); 

  turnOffNotifications.hears(/^(❌ )?Нет$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел "${ctx.update.message.text}".`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply("Уведомления по-прежнему включены.", keyboards.turnOff);
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  });

  turnOffNotifications.on('message', (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел неизвестную команду.`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply(`Я вас не понимаю. Введите "Да" или "Нет".`, keyboards.yesNo);

  });

  return turnOffNotifications;
};




module.exports = handler;

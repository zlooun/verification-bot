"use strict";




const keyboards = global.keyboards;
const Scene = require('telegraf/scenes/base');

const dirname = path.relative(process.cwd(), __dirname);

const handler = () => {

  const turnOnNotifications = new Scene('turnOnNotifications');

  turnOnNotifications.enter((ctx) => {
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

      global.redis.hexists("queue", ctx.from.id).then((result) => {

      
        if (result) {
          winston.info(`${log} - - Уведомления у пользователя включены.`);
          winston.info(`${log} - - Отправляем ответ пользователю.`);
          ctx.reply("У вас уже включены уведомления.", keyboards.turnOff);
  
          winston.info(`${log} - - Покидаем сцену.`);
          ctx.scene.leave();
          return;
        }
  
        winston.info(`${log} - - Уведомления у пользователя отключены.`);
  
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply(`Вы уверены, что хотите включить уведмоления? (Введите "Да" или "Нет")`, keyboards.yesNo);
  
      }, (err) => winston.error(`${log} - - ${err}`));
      
    }, (err) => winston.error(`${log} - - ${err}`));

  });

  turnOnNotifications.hears(/^(✅ )?Да$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел "${ctx.update.message.text}".`);

    global.mongoModels.User.findOneAndUpdate({"idUserTelegram": ctx.from.id}, { "notifications": true }, { new : true })
    .then((user) => {

      if (!user) {
        winston.warn(`${log} - - Пользователь не обновился в бд.`);
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply("Ошибка.", keyboards.turnOn);
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      global.session.set(ctx.sessionKey, user)
      .then(() => {
        global.redis.exists("queue")
        .then((result) => {
          global.redis.hset("queue", ctx.from.id, !result)
          .then((result) => {
    
            if (result) {
              winston.info(`${log} - - Пользователь добавлен в очередь. Уведомления включены.`);
              winston.info(`${log} - - Отправляем ответ пользователю.`);
              ctx.reply("Уведомления включены.", keyboards.turnOff);
              winston.info(`${log} - - Покидаем сцену.`);
              ctx.scene.leave();
              return;
            }
      
            winston.warn(`${log} - - Пользователь не добавился в очередь. WHAT?`);
            winston.info(`${log} - - Отправляем ответ пользователю.`);
            ctx.reply("Вы не добавились в очередь.WHAT?.", keyboards.turnOff);
            winston.info(`${log} - - Покидаем сцену.`);
            ctx.scene.leave();
      
          }, (err) => winston.error(`${log} - - ${err}`));
          
        }, (err) => winston.error(`${log} - - ${err}`));

      }, (err) => winston.error(`${log} - - ${err}`));

    }, (err) => winston.error(`${log} - - ${err}`));
    
  });

  turnOnNotifications.hears(/^(❌ )?Нет$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел "${ctx.update.message.text}".`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply("Уведомления по-прежнему отключены.", keyboards.turnOn);
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  });

  turnOnNotifications.on('message', (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел неизвестную команду.`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply(`Я вас не понимаю. Введите "Да" или "Нет".`, keyboards.yesNo);

  });

  return turnOnNotifications;
};




module.exports = handler;

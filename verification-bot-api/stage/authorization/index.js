"use strict";



const keyboards = global.keyboards;
const Scene = require('telegraf/scenes/base');

const dirname = path.relative(process.cwd(), __dirname);

const handler = () => {

  const authorization = new Scene('authorization');

  authorization.enter((ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;

    global.session.get(ctx.sessionKey)
    .then((session) => {

      if (Object.keys(session).length) {

        ctx.notifications = session.notifications;

        winston.info(`${log} - - Пользователь авторизирован.`);

        winston.info(`${log} - - Отправляем ответ пользователю.`);
        global.listAnswer.isAuthenticated()
        .then((str) => ctx.reply(str, ctx.notifications ? keyboards.turnOff : keyboards.turnOn));

        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();

        return;
      }

      winston.info(`${log} - - Пользователь не авторизирован.`);
      winston.info(`${log} - - Отправляем ответ пользователю.`);
      ctx.reply('Введи свой токен авторизации, чтобы я смог тебя опознать.', {reply_markup: {remove_keyboard: true}});

    });

  });

  authorization.hears(/^(⛔ )?Хватит$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел ${ctx.update.message.text}.`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply("Прощай(", keyboards.authorization);
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  }); 

  authorization.hears(/^8z6Fp3$/g, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел ${ctx.update.message.text}.`);

    ctx.reply("Вы авторизированы.", keyboards.turnOff);
    ctx.scene.leave();

    global.mongoModels.User.findOne({"idUserTelegram": ctx.from.id})
    .then(() => {

      global.mongoModels.User.findOneAndUpdate({ "idUserTelegram": ctx.from.id }, { "isAuthenticated": true, "notifications": true }, { new : true })
      .then((user) => {
        global.session.set(ctx.sessionKey, user);
        global.redis.exists("queue")
        .then((result) => global.redis.hset("queue", ctx.from.id, !result), (err) => winston.error(`${log} - - ${err}`));
      }, (err) => winston.error(`${log} - - ${err}`));
      
    }, (err) => winston.error(`${log} - - ${err}`));
    
  });

  authorization.on('message', (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел ${ctx.update.message.text}. Неизвестная команда.`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply(`Я тебя не знаю:(
Попробуй еще раз, или введи "Хватит".`, keyboards.enough);
  });

  return authorization;
};




module.exports = handler;

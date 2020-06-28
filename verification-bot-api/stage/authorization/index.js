"use strict";




const Scene = require('telegraf/scenes/base');


const handler = () => {

  const authorization = new Scene('authorization');
  authorization.enter((ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;

    winston.info(`${log} - - Пользователь вошел в сцену.`);

    winston.info(`${log} - - Поиск сессии пользователя в redis.`);
    global.session.get(ctx.sessionKey)
    .then((session) => {

      if (Object.keys(session).length) {
        winston.info(`${log} - - Сессия найдена.`);
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        global.listAnswer.isAuthenticated()
        .then((str) => ctx.reply(str));
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      winston.info(`${log} - - Сессия не найдена.`);

      winston.info(`${log} - - Отправляем ответ пользователю.`);
      ctx.reply('Введи свой токен авторизации, чтобы я смог тебя опознать.');

    })

  });

  authorization.hears(/Хватит/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "хватит".`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply("Прощай(");
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  }); 
  authorization.hears(/Пусти/gi, (ctx) => {

    ctx.reply("Ну ладно)");
    ctx.scene.leave();

    global.mongoModels.User.findOne({"idUserTelegram": ctx.from.id})
    .then(() => {

      global.mongoModels.User.findOneAndUpdate({ "idUserTelegram": ctx.from.id }, { "isAuthenticated": true, "notifications": true }, { new : true })
      .then((user) => {
        global.session.set(ctx.sessionKey, user);
        global.redis.exists("queue")
        .then((result) => global.redis.hset("queue", ctx.from.id, result ? false : true))
      });

    })
    
  });
  authorization.on('message', (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел то, что не ожидалось.`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply(`Я тебя не знаю:(
Попробуй еще раз, или введи "Хватит".`)
    });

  return authorization;
};




module.exports = handler;

"use strict";



const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');


const handler = () => {

  const help = new Scene('help');

  help.enter((ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь вошел в сцену.`);

    winston.info(`${log} - - Поиск сессии пользователя в redis.`);
    global.session.get(ctx.sessionKey)
    .then((session) => {

      winston.info(`${log} - - Проверяем авторизован ли пользователь или нет.`);
      if (!Object.keys(session).length) {
        winston.info(`${log} - - Пользователь не авторизован.`);

        winston.info(`${log} - - Отправляем ответ пользователю.`);
        global.listAnswer.help(ctx.from, session.isAuthenticated)
        .then((answer) => ctx.reply(answer, Markup
          .keyboard(['🌚 Авторизоваться'])
          .oneTime()
          .resize()
          .extra()
        ));

        return;
      }
      winston.info(`${log} - - Пользователь авторизован.`);

      winston.info(`${log} - - Отправляем ответ пользователю.`);
      global.listAnswer.help(ctx.from, session.isAuthenticated)
      .then((answer) => ctx.reply(answer, Markup
        .keyboard([['👍 Включить уведомления'],
                   ['👎 Выключить уведомления'],
                   ['👌 Понял']])
        .oneTime()
        .resize()
        .extra()
      ));

    });

  });

  help.hears(/^(🌚 )?Авторизоваться$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "Авторизоваться".`);

    winston.info(`${log} - - Запускается сцена авторизации.`);
    ctx.scene.enter('authorization');
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  }); 

  help.hears(/^(👍 )?Включить уведомления$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "Включить уведомления".`);

    winston.info(`${log} - - Запускается сцена включения уведомлений.`);
    ctx.scene.enter('turnOnNotifications');
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  });

  help.hears(/^(👎 )?Выключить уведомления$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "Выключить уведомления".`);

    winston.info(`${log} - - Запускается сцена выключения уведомлений.`);
    ctx.scene.enter('turnOffNotifications');
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  });

  help.hears(/^(👌 )?Понял$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "Понял".`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply(`Хорошо)`, {reply_markup: {remove_keyboard: true}});
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  }); 

  help.on('message', (ctx, next) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел то, что не ожидалось.`);

    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    winston.info(`${log} - - Отправляем запрос дальше.`);
    next();

  });

  return help;
};




module.exports = handler;

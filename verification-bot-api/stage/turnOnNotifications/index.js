"use strict";



//const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');


const handler = () => {

  const turnOnNotifications = new Scene('turnOnNotifications');

  turnOnNotifications.enter((ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь вошел в сцену.`);

    winston.info(`${log} - - Поиск сессии пользователя в redis.`);
    global.session.get(ctx.sessionKey)
    .then((session) => {

      if (!Object.keys(session).length) {
        winston.info(`${log} - - Сессия не найдена.`);
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        global.listAnswer.notAuthenticated(ctx.from)
        .then((str) => ctx.reply(str, {reply_markup: {remove_keyboard: true}}));
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      winston.info(`${log} - - Сессия найдена.`);

      winston.info(`${log} - - Проверяем включены ли у пользователя уведомления.`);
      global.redis.hexists("queue", ctx.from.id)
      .then((result) => {

        if (result) {
          winston.info(`${log} - - Уведомления у пользователя включены.`);
          winston.info(`${log} - - Отправляем ответ пользователю.`);
          ctx.reply("У вас уже включены уведомления.", {reply_markup: {remove_keyboard: true}});
          winston.info(`${log} - - Покидаем сцену.`);
          ctx.scene.leave();
          return;
        }

        winston.info(`${log} - - Уведомления у пользователя отключены.`);

        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply(`Вы уверены, что хотите включить уведмоления? (Введите "Да" или "Нет")`, Markup
          .keyboard(['✅ Да', '❌ Нет'])
          .oneTime()
          .resize()
          .extra()
        );

      }, (err) => winston.info(`${log} - - ${err}`));

    }, (err) => winston.info(`${log} - - ${err}`));

  });

  turnOnNotifications.hears(/^(✅ )?Да$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "да".`);

    winston.info(`${log} - - Обновляем пользователя в бд.`);
    global.mongoModels.User.findOneAndUpdate({"idUserTelegram": ctx.from.id}, { "notifications": true }, { new : true })
    .then((user) => {

      if (!user) {
        winston.info(`${log} - - Пользователь не обновился.`);
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply("Ошибка.", {reply_markup: {remove_keyboard: true}});
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      winston.info(`${log} - - Обновляем сессию пользователя.`);
      global.session.set(ctx.sessionKey, user)
      .then(() => {

        winston.info(`${log} - - Проверяем пуста ли очередь.`);
        global.redis.exists("queue")
        .then((result) => {

          result ? winston.info(`${log} - - Очередь не пуста. Назначаем пользователя следующим в очереди.`)
          : winston.info(`${log} - - Очередь пуста. Просто добавляем пользователя в конец очереди.`);
          global.redis.hset("queue", ctx.from.id, result ? false : true)
          .then((result) => {
  
            if (result) {
              winston.info(`${log} - - Пользователь добавлен в очередь. Уведомления включены.`);
              winston.info(`${log} - - Отправляем ответ пользователю.`);
              ctx.reply("Уведомления включены.", {reply_markup: {remove_keyboard: true}});
              winston.info(`${log} - - Покидаем сцену.`);
              ctx.scene.leave();
              return;
            }
  
            winston.info(`${log} - - Пользователь не добавился в очередь. WHAT?`);
            winston.info(`${log} - - Отправляем ответ пользователю.`);
            ctx.reply("Вы не добавились в очередь.WHAT?.", {reply_markup: {remove_keyboard: true}});
            winston.info(`${log} - - Покидаем сцену.`);
            ctx.scene.leave();

          }, (err) => winston.info(`${log} - - ${err}`));

        }, (err) => winston.info(`${log} - - ${err}`));

      }, (err) => winston.info(`${log} - - ${err}`));

    }, (err) => winston.info(`${log} - - ${err}`));
    
  });

  turnOnNotifications.hears(/^(❌ )?Нет$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "нет".`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply("Уведомления по-прежнему отключены.", {reply_markup: {remove_keyboard: true}});
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  });

  turnOnNotifications.on('message', (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел неизвестную команду.`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply(`Я вас не понимаю. Введите "Да" или "Нет".`, Markup
      .keyboard(['✅ Да', '❌ Нет'])
      .oneTime()
      .resize()
      .extra()
    );

  });

  return turnOnNotifications;
};




module.exports = handler;

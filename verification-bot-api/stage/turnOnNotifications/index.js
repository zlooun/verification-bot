"use strict";



//const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
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
        .then((str) => ctx.reply(str, {reply_markup: {remove_keyboard: true}}));
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      winston.info(`${log} - - Пользователь авторизирован.`);

      return global.redis.hexists("queue", ctx.from.id);
      
    }, (err) => winston.error(`${log} - - ${err}`))
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
        ctx.reply("Ошибка.", {reply_markup: {remove_keyboard: true}});
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      return global.session.set(ctx.sessionKey, user);
    }, (err) => winston.error(`${log} - - ${err}`))
    .then(() => global.redis.exists("queue"), (err) => winston.error(`${log} - - ${err}`))
    .then((result) => global.redis.hset("queue", ctx.from.id, !result), (err) => winston.error(`${log} - - ${err}`))
    .then((result) => {

      if (result) {
        winston.info(`${log} - - Пользователь добавлен в очередь. Уведомления включены.`);
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply("Уведомления включены.", {reply_markup: {remove_keyboard: true}});
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      winston.warn(`${log} - - Пользователь не добавился в очередь. WHAT?`);
      winston.info(`${log} - - Отправляем ответ пользователю.`);
      ctx.reply("Вы не добавились в очередь.WHAT?.", {reply_markup: {remove_keyboard: true}});
      winston.info(`${log} - - Покидаем сцену.`);
      ctx.scene.leave();

    }, (err) => winston.error(`${log} - - ${err}`));
    
  });

  turnOnNotifications.hears(/^(❌ )?Нет$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел "${ctx.update.message.text}".`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply("Уведомления по-прежнему отключены.", {reply_markup: {remove_keyboard: true}});
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  });

  turnOnNotifications.on('message', (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел "${ctx.update.message.text}", (неизвестная команда).`);

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

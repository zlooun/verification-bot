"use strict";



const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');


const handler = () => {

  const turnOffNotifications = new Scene('turnOffNotifications');

  turnOffNotifications.enter((ctx) => {
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

        if (!result) {
          winston.info(`${log} - - Уведомления у пользователя отключены.`);
          winston.info(`${log} - - Отправляем ответ пользователю.`);
          ctx.reply("У вас уже отключены уведомления.", {reply_markup: {remove_keyboard: true}});
          winston.info(`${log} - - Покидаем сцену.`);
          ctx.scene.leave();
          return;
        }

        winston.info(`${log} - - Уведомления у пользователя включены.`);

        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply(`Вы уверены, что хотите отключить уведмоления? (Введите "Да" или "Нет")`, Markup
          .keyboard(['✅ Да', '❌ Нет'])
          .oneTime()
          .resize()
          .extra()
        );

      }, (err) => winston.info(`${log} - - ${err}`));

    }, (err) => winston.info(`${log} - - ${err}`));

  });

  turnOffNotifications.hears(/^(✅ )?Да$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "да".`);

    winston.info(`${log} - - Обновляем пользователя в бд.`);
    global.mongoModels.User.findOneAndUpdate({"idUserTelegram": ctx.from.id}, { "notifications": false }, { new : true })
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

        winston.info(`${log} - - Ищем пользователя в очереди.`);
        global.redis.hget("queue", ctx.from.id)
        .then((turn) => {

          winston.info(`${log} - - Проверяем пользовательская сейчас очередь получить уведомление или нет.`);
          if (turn === "false") {
            winston.info(`${log} - - Очередь не пользователя.`);

            winston.info(`${log} - - Удаляем пользователя из очереди.`);
            global.redis.hdel("queue", ctx.from.id)
            .then((result) => {
    
              if (result) {
                winston.info(`${log} - - Пользователь удален из очереди. Уведомления отключены.`);
                winston.info(`${log} - - Отправляем ответ пользователю.`);
                ctx.reply("Уведомления отключены.", {reply_markup: {remove_keyboard: true}});
                winston.info(`${log} - - Покидаем сцену.`);
                ctx.scene.leave();
                return;
              }
    
              winston.info(`${log} - - Пользователь не удалился из очереди. WHAT?`);
              winston.info(`${log} - - Отправляем ответ пользователю.`);
              ctx.reply("Вы не удалились из очереди.WHAT?.", {reply_markup: {remove_keyboard: true}});
              winston.info(`${log} - - Покидаем сцену.`);
              ctx.scene.leave();
    
            });

            return;
          }
          winston.info(`${log} - - Очередь пользователя.`);

          winston.info(`${log} - - Получаем всю очередь из redis.`);
          global.redis.hgetall("queue")
          .then((queue) => {
    
            queue = Object.entries(queue);

            winston.info(`${log} - - Ищем данного пользователя в очереди.`);
            for (let i = 0; i < queue.length; i++) {
              
              const turn = queue[i];
    
              if (turn[1] === "true") {
                winston.info(`${log} - - Пользователь найден.`);

                winston.info(`${log} - - Удаляем пользователя из очереди.`);
                global.redis.hdel("queue", ctx.from.id)
                .then((result) => {
        
                  if (result) {
                    winston.info(`${log} - - Пользователь удалился. Уведомления выключены.`);
                    winston.info(`${log} - - Отправляем ответ пользователю.`);
                    ctx.reply("Уведомления отключены.", {reply_markup: {remove_keyboard: true}});
                    winston.info(`${log} - - Покидаем сцену.`);
                    ctx.scene.leave();
                    return;
                  }
        
                  winston.info(`${log} - - Пользователь не удалился.WHAT?.`);
                  winston.info(`${log} - - Отправляем ответ пользователю.`);
                  ctx.reply("Вы не удалились из очереди.WHAT?.", {reply_markup: {remove_keyboard: true}});
                  winston.info(`${log} - - Покидаем сцену.`);
                  ctx.scene.leave();
        
                });
    
                winston.info(`${log} - - Проверяем был ли пользователь не один в очереди.`);
                if (queue.length !== 1) {
                  winston.info(`${log} - - Пользователь был не один в очереди.`);

                  winston.info(`${log} - - Проверяем последним ли в очереди был пользователь.`);
                  if (i === queue.length - 1) {
                    winston.info(`${log} - - Пользователь был последним в очереди.`);

                    winston.info(`${log} - - Назначаем первого пользователя из очереди следующим в очереди для получения уведомления.`);
                    global.redis.hset("queue", queue[0][0], true).catch((err) => winston.info(`${log} - - ${err}`));
                    return;
                  }
                  
                  winston.info(`${log} - - Пользователь был не последним в очереди.`);

                  winston.info(`${log} - - Назначаем следующего пользователя в очереди следующим для получения уведомления.`);
                  global.redis.hset("queue", queue[i + 1][0], true).catch((err) => winston.info(`${log} - - ${err}`));
                  return;

                }

                winston.info(`${log} - - Пользователь был один в очереди.`);
                return;

              }
    
            }
    
          }, (err) => winston.info(`${log} - - ${err}`));

        }, (err) => winston.info(`${log} - - ${err}`))

      }, (err) => winston.info(`${log} - - ${err}`));

    }, (err) => winston.info(`${log} - - ${err}`));
    
  }); 

  turnOffNotifications.hears(/^(❌ )?Нет$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "нет".`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply("Уведомления по-прежнему включены.", {reply_markup: {remove_keyboard: true}});
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  });

  turnOffNotifications.on('message', (ctx) => {
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

  return turnOffNotifications;
};




module.exports = handler;

"use strict";



const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');


const handler = () => {

  const start = new Scene('start');

  start.enter((ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь вошел в сцену.`);

    const findObj = {
      idUserTelegram: ctx.from.id
    }
  
    winston.info(`${log} - - Поиск пользователя в бд.`);
    global.mongoModels.User.findOne(findObj)
    .then((doc) => {
  
      if (!doc) {
        winston.info(`${log} - - Пользователь не найден.`);
  
        winston.info(`${log} - - Сохраняем пользователя в бд.`);
        global.handler.saveUser(ctx);
  
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        global.listAnswer.notExistUser(ctx.from)
        .then((answer) => ctx.reply(answer, Markup
          .keyboard(['🌚 Авторизоваться'])
          .oneTime()
          .resize()
          .extra()
        ));
        
        return; 
      }
  
      winston.info(`${log} - - Пользователь найден.`);
  
      winston.info(`${log} - - Отправляем ответ пользователю.`);
      global.listAnswer.existUser(ctx)  
      .then((answer, isAuth) => {

        if (!isAuth){
          ctx.reply(answer, Markup
            .keyboard(['🌚 Авторизоваться'])
            .oneTime()
            .resize()
            .extra()
          );

          return;
        }

        ctx.reply(answer, {reply_markup: {remove_keyboard: true}});
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
      });
  
    }, (err) => winston.info(`${log} - - ${err}`));

  });

  start.hears(/^(🌚 )?Авторизоваться$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел "Авторизоваться".`);

    winston.info(`${log} - - Запускается сцена авторизации.`);
    ctx.scene.enter('authorization');
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  }); 

  start.on('message', (ctx, next) => {
    const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
    winston.info(`${log} - - Пользователь ввел то, что не ожидалось.`);

    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    winston.info(`${log} - - Отправляем запрос дальше.`);
    next();

  });

  return start;
};




module.exports = handler;

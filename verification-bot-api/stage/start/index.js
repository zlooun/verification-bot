"use strict";



const keyboards = global.keyboards;
const Scene = require('telegraf/scenes/base');

const dirname = path.relative(process.cwd(), __dirname);

const handler = () => {

  const start = new Scene('start');

  start.enter((ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;

    const findObj = {
      idUserTelegram: ctx.from.id
    };
  
    global.mongoModels.User.findOne(findObj)
    .then((doc) => {
  
      if (!doc) {
        winston.info(`${log} - - Пользователя нет в бд.`);
  
        winston.info(`${log} - - Сохраняем пользователя в бд.`);
        global.handler.saveUser(ctx);
  
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        global.listAnswer.notExistUser(ctx.from)
        .then((answer) => ctx.reply(answer, keyboards.authorization));
        
        return;
      }
  
      winston.info(`${log} - - Пользователь найден в бд.`);
  
      winston.info(`${log} - - Отправляем ответ пользователю.`);
      global.listAnswer.existUser(ctx)  
      .then((answer) => {

        if (!answer.isAuth){
          ctx.reply(answer.str, keyboards.authorization);

          return;
        }

        ctx.reply(answer.str, doc.notifications ? keyboards.turnOff : keyboards.turnOn);
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
      });
  
    }, (err) => winston.error(`${log} - - ${err}`));

  });

  start.hears(/^(🌚 )?Авторизоваться$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел ${ctx.update.message.text}.`);

    winston.info(`${log} - - Запускается сцена авторизации.`);
    ctx.scene.enter('authorization');
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  }); 

  start.on('message', (ctx, next) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел ${ctx.update.message.text}, (неизвестная команда).`);

    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    winston.info(`${log} - - Отправляем запрос дальше.`);
    next();

  });

  return start;
};




module.exports = handler;

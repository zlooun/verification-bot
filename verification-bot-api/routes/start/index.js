"use strict";





const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;

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
      .then((answer) => ctx.reply(answer));
      
      return; 
    }

    winston.info(`${log} - - Пользователь найден.`);

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    global.listAnswer.existUser(ctx)
    .then((answer) => ctx.reply(answer));

  }, (err) => winston.info(`${log} - - ${err}`));

};




module.exports = handler;

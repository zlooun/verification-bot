"use strict";




const handler = (ctx, next) => {
  const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;

  winston.info(`${log} - - Проверка сессии пользователя.`);
  global.session.get(ctx.sessionKey).then((session) => {

    if (Object.keys(session).length) {
      winston.info(`${log} - - Сессия существует.`);
      winston.info(`${log} - - Обновляем данные о пользователе.`);
      global.handler.updateUser(ctx);
      next();
      return;
    }
    winston.info(`${log} - - Сессия не существует.`);

    const findObj = {
      idUserTelegram: ctx.from.id
    }

    winston.info(`${log} - - Поиск пользователя в бд.`);
    global.mongoModels.User.findOne(findObj)
    .then((data) => {

      if (!data) {
        winston.info(`${log} - - Пользователь не найден.`);
        return;
      }

      winston.info(`${log} - - Обновляем данные о пользователе.`);
      global.handler.updateUser(ctx);

      if (data.isAuthenticated === true) {
        winston.info(`${log} - - Пользователь авторизован - устанавливаем сессию.`);
        global.session.set(ctx.sessionKey, data)
      .then(() => next());
      return;
      }

      winston.info(`${log} - - Пользователь не авторизован.`);
      next();

    }, (err) => console.log(err));

    
  })

};




module.exports = handler;

"use strict";




const handler = (ctx, next) => {
  const log = `[BOT][${ctx.from.id}] - - [${path.relative(process.cwd(), __dirname)}]`;

  global.session.get(ctx.sessionKey).then((session) => {

    if (Object.keys(session).length) {
      global.handler.updateUser(ctx);
      next();
      return;
    }


    const findObj = {
      idUserTelegram: ctx.from.id
    }

    global.mongoModels.User.findOne(findObj)
    .then((data) => {

      if (!data) {
        winston.info(`${log} - - Пользователь не найден в бд.`);
        return;
      }

      global.handler.updateUser(ctx);

      if (data.isAuthenticated === true) {
        global.session.set(ctx.sessionKey, data)
        .then(() => next());
        return;
      }

      next();

    }, (err) => winston.info(`${log} - - ${err}`));
    
  }, (err) => winston.info(`${log} - - ${err}`))

};




module.exports = handler;

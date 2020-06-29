"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;
  
  const from = ctx.from;
  const updateDate = Date.now();


  const updateObj = {
    "idChatTelegram": ctx.chat.id,
    "name": from.first_name,
    "lastname": from.last_name,
    "login": from.username,
    "lang": from.language_code,
    "lastUpdate": updateDate
  };


  global.mongoModels.User.findOneAndUpdate({ idUserTelegram : from.id }, updateObj, { new : true})
  .then((updatedUser) => {

    if (!updatedUser) {
      winston.info(`${log} - - Пользователь не обновился в бд.`);
      return;
    }

    winston.info(`${log} - - Пользователь обновился в бд.`);

  }, (err) => winston.info(`${log} - - ${err}`))

};




module.exports = handler;

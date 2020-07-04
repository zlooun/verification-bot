"use strict";




const dirname = path.relative(process.cwd(), __dirname);


const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  
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

  }, (err) => winston.info(`${log} - - ${err}`));

};




module.exports = handler;

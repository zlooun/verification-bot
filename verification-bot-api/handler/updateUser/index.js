"use strict";




const dirname = path.relative(process.cwd(), __dirname);


const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  
  const from = ctx.from;
  const updateDate = Date.now();


  const updateObj = {
    "name": from.first_name,
    "lastname": from.last_name,
    "login": from.username,
    "lang": from.language_code,
    "lastUpdate": updateDate
  };


  global.mongoModels.User.findOneAndUpdate({ idUserTelegram : from.id }, updateObj, { new : true})
  .then((updatedUser) => {

    if (!updatedUser) {
      winston.warn(`${log} - - Пользователь не обновился в бд.`);
      return;
    }

    if (updatedUser.isAuthenticated === true) {
      global.session.set(ctx.sessionKey, updatedUser)
      .catch((err) => winston.error(`${log} - - ${err}`));
      return;
    }
    
  }, (err) => winston.error(`${log} - - ${err}`));

};




module.exports = handler;

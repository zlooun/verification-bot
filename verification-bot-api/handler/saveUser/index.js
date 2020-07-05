"use strict";




const crypto = require ("crypto");
const uuidV1 = require ("uuid/v1");


const dirname = path.relative(process.cwd(), __dirname);


const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  
  const from = ctx.from;
  const createDate = Date.now();
  const uuid = uuidV1();
  const salt = crypto.createHash("sha512").update(from.id + uuid + createDate + Math.random()).digest("hex");


  const saveObj = {
    "idUserTelegram": from.id,
    "idChatTelegram": ctx.chat.id,
    "name": from.first_name,
    "lastname": from.last_name,
    "login": from.username,
    "lang": from.language_code,
    "isBot": from.is_bot,
    "lock": false,
    "createDate": createDate,
    "lastUpdate": createDate,
    "uuid": uuid,
    "salt": salt,
    "isAuthenticated": false,
    "notifications": false,
  };


  const user = new global.mongoModels.User(saveObj);


  user.save((err, doc) => {

    if (err) {
      winston.error(`${log} - - ${err}.`);
      return;
    }

    if (!doc) {
      winston.warn(`${log} - - Пользователь не сохранился в бд.`);
      return;
    }


    winston.info(`${log} - - Пользователь сохранился в бд.`);
  });

};




module.exports = handler;

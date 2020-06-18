"use strict";




const crypto = require ("crypto");
const uuidV1 = require ("uuid/v1");


const handler = (from, callback) => {

  const createDate = Date.now();
  const uuid = uuidV1();
  const salt = crypto.createHash("sha512").update(from. id + uuid + createDate + Math. random ()).digest("hex");


  const saveObj = {
    "idUserTelegram": from.id,
    "idChatTelegram": from.id,
    "name": from.first_name,
    "lastname": from.last_name,
    "login": from.username,
    "lang": from.language_code,
    "isBot": from.is_bot,
    "lock": false,
    "createDate": createDate,
    "uuid": uuid,
    "salt": salt
  };


  const user = new global.mongoModels.User(saveObj);


  user.save((err, doc) => {

    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    if (!doc) {
      callback(null, "notExist");
      return;
    }

    callback(null, doc);

  });

};




module.exports = handler;

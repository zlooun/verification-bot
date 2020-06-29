"use strict";




const Schema = require("mongoose").Schema;




const obj = new Schema ({
  "salt": String,
  "uuid": String,
  "idUserTelegram": String,
  "idChatTelegram": String,
  "name": String,
  "lastname": String,
  "login": String,
  "createDate": Date,
  "lastUpdate": Date,
  "lock": Boolean,
  "isBot": Boolean,
  "lang": String,
  "type": String,
  "photo": Object,
  "isAuthenticated": Boolean,
  "notifications": Boolean,
});




module.exports = obj;

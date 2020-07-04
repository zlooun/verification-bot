"use strict";




const saveRequest = require("./saveRequest");


const handler = (req, res) => {
  const log = `[EXPRESS][${req.ip}] - - [${req.originalUrl}] - -`;

  let notification = req.body.notification;

  if (!notification) {
    res.send("Notification is empty");
    winston.warn(`${log} Уведомление пустое.`);
    return;
  }

  res.send("Success");


  winston.info(`${log} Сохраняем запрос.`);
  saveRequest(JSON.parse(notification)).catch((err) => winston.error(`${log} ${err}.`));

  winston.info(`${log} Отправляем уведомление через pub/sub.`);
  global.redis.publish("notification", notification);

};




module. exports = handler;

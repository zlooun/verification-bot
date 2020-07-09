"use strict";




const saveRequest = require("./saveRequest");


const handler = (req, res) => {
  const log = `[EXPRESS][${req.ip}] - - [${req.originalUrl}] - -`;

  let notification = {
    name: req.body.notification.name,
    lastname: req.body.notification.lastname,
    login: req.body.notification.login,
    project: req.body.project,
    fromServer: req.body.fromServer,
    link: req.body.notification.link
  }

  res.send("Success");


  winston.info(`${log} Сохраняем запрос.`);
  saveRequest(notification)
  .then((savedRequest) => {

    try {
      notification = JSON.stringify(savedRequest);
    } catch (err) {
      winston.error(`${log} ${err}.`);
      res.send("Can't stringify.");
      return;
    }

    winston.info(`${log} Отправляем уведомление через pub/sub.`);
    global.redis.publish("notification", notification);

  }, (err) => winston.error(`${log} ${err}.`));

};




module.exports = handler;

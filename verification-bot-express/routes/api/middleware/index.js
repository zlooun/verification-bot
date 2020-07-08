"use strict";




const apiKey = global.process.env.API_KEY;


const handler = (req, res, next) => {
  const log = `[EXPRESS][${req.ip}] - - [${req.originalUrl}] - -`;

  const notification = req.body.notification;

  if (!notification){
    winston.warn(`${log} Пустое уведомление.`);
    res.send("Notification is empty");
    return;
  }

  
  const receivedApiKey = req.body.apiKey;

  if (apiKey === receivedApiKey) {
    winston.info(`${log} Верный apiKey.`);
    next();
    return;
  }

  winston.warn(`${log} Не верный apiKey.`);
  res.send("You haven't access");

};




module.exports = handler;

"use strict";




const apiKey = global.process.env.API_KEY;


const handler = (req, res, next) => {
  const log = `[EXPRESS][${req.ip}] - - [${req.originalUrl}] - -`;

  const receivedApiKey = req.body.notification.apiKey;

  if (apiKey === receivedApiKey) {
    winston.info(`${log} Верный apiKey.`);
    delete req.body.notification.apiKey;
    next();
    return;
  }

  winston.warn(`${log} Не верный apiKey.`);
  res.send("You haven't access");

};




module.exports = handler;

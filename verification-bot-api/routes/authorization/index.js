"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;

  winston.info(`${log} - - Запускается сцена авторизации.`);
  ctx.scene.enter('authorization');

};




module.exports = handler;

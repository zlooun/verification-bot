"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;

  winston.info(`${log} - - Запускается сцена старт.`);
  ctx.scene.enter('start');

};




module.exports = handler;

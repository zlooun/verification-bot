"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;

  winston.info(`${log} - - Запускается сцена помощи.`);
  ctx.scene.enter('help');

};




module.exports = handler;

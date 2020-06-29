"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;

  winston.info(`${log} - - Запускается сцена другое.`);
  ctx.scene.enter('other');

};




module.exports = handler;

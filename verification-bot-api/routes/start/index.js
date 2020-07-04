"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${path.relative(process.cwd(), __dirname)}]`;

  winston.info(`${log} - - Запускается сцена "Старт".`);
  ctx.scene.enter('start');

};




module.exports = handler;

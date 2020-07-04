"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${path.relative(process.cwd(), __dirname)}]`;

  winston.info(`${log} - - Запускается сцена "Помощь".`);
  ctx.scene.enter('help');

};




module.exports = handler;

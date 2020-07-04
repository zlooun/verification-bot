"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${path.relative(process.cwd(), __dirname)}]`;

  winston.info(`${log} - - Запускается сцена "Включить уведомления".`);
  ctx.scene.enter('turnOnNotifications');

};




module.exports = handler;

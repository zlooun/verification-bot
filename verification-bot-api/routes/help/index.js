"use strict";




const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${__dirname.slice(49)}]`;

  winston.info(`${log} - - Отправляем ответ пользователю.`);
  global.listAnswer.help(ctx.from, (answer) => ctx.reply(answer));

};




module.exports = handler;

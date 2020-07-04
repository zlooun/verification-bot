"use strict";




const dirname = path.relative(process.cwd(), __dirname);


const handler = (ctx) => {
  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;

  winston.info(`${log} - - Запускается сцена "Авторизация".`);
  ctx.scene.enter('authorization');

};




module.exports = handler;

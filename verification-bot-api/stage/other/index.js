"use strict";



const keyboards = global.keyboards;
const Scene = require('telegraf/scenes/base');

const dirname = path.relative(process.cwd(), __dirname);

const handler = () => {

  const other = new Scene('other');

  other.enter((ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;

    winston.info(`${log} - - Отправляем ответ пользователю.`);
    ctx.reply("Неизвестная команда, напиши /help, чтобы посмотреть какими командами ты можешь пользоваться.", keyboards.help);

  });

  other.hears(/^(💡 )?Помощь$/gi, (ctx) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел "Помощь".`);

    winston.info(`${log} - - Запускается сцена помощи.`);
    ctx.scene.enter('help');
    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    
  }); 

  other.on('message', (ctx, next) => {
    const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
    winston.info(`${log} - - Пользователь ввел то, что не ожидалось.`);

    winston.info(`${log} - - Покидаем сцену.`);
    ctx.scene.leave();
    winston.info(`${log} - - Отправляем запрос дальше.`);
    next();

  });

  return other;
};




module.exports = handler;

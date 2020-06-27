"use strict";




const Scene = require('telegraf/scenes/base');


const handler = (leave) => {

  const authorization = new Scene('authorization');
  authorization.enter((ctx) => ctx.reply('Введи свой токен авторизации, чтобы я смог тебя опознать.'));
  authorization.leave((ctx) => ctx.reply('Прощай('));
  authorization.hears(/Хватит/gi, leave());
  authorization.on('message', (ctx) => ctx.reply(`Я тебя не знаю:(
Попробуй еще раз, или введи "Хватит".`));

  return authorization;
};




module.exports = handler;

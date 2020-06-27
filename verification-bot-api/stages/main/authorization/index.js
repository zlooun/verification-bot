"use strict";




const Scene = require('telegraf/scenes/base');


const handler = (leave) => {

  const authorization = new Scene('authorization');
  authorization.enter((ctx) => ctx.reply('Hi'));
  authorization.leave((ctx) => ctx.reply('Bye'));
  authorization.hears(/hi/gi, leave());
  authorization.on('message', (ctx) => ctx.reply('Send `hi`'));

  return authorization;
};




module.exports = handler;

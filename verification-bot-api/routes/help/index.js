"use strict";




const handler = (ctx) => {

  global.listAnswer.help(ctx.from, (answer) => ctx.reply(answer));

};




module.exports = handler;

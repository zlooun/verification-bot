"use strict";




const handler = (ctx) => {

  global.listAnswer.settings(ctx.from, (answer) => ctx.reply(answer));

};




module.exports = handler;

"use strict";




const handler = (ctx) => {

  global.listAnswer.info(ctx.from, (answer) => ctx.reply(answer));

};




module.exports = handler;

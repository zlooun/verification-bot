"use strict";




const handler = (ctx) => {

  global.listAnswer.challenge(ctx.from, (answer) => ctx.reply(answer));

};




module.exports = handler;

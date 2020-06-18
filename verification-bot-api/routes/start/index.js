"use strict";





const handler = (ctx) => {

  const from = ctx.from;
  const session = ctx.session;


  if (session[from. id]) {
    global.listAnswer.existUser(from, (answer) => ctx.reply(answer));
    return;
  }


  global.handler.saveUserInSession(ctx, from);
  global.listAnswer.notExistUser(from, (answer) => ctx.reply(answer));

};




module.exports = handler;

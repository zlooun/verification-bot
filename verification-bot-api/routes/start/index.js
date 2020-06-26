"use strict";





const handler = (ctx) => {

  const from = ctx.from;

  global.session.get(ctx.sessionKey).then((session) => {

    if (Object.keys(session).length) {
      global.listAnswer.existUser(from).then((answer) => ctx.reply(answer));
      return;
    }

    global.handler.saveUserInSession(ctx, from);
    global.listAnswer.notExistUser(from).then((answer) => ctx.reply(answer));
  })

};




module.exports = handler;

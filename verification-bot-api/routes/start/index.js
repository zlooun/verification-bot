"use strict";





const handler = (ctx) => {

  const from = ctx.from;

  global.session.get(ctx.sessionKey).then((session) => {

    if (!session.firstTime) {
      global.listAnswer.existUser(from).then((answer) => ctx.reply(answer));
      return;
    }

    delete session.firstTime;
    global.session.set(ctx.sessionKey, session);
    global.listAnswer.notExistUser(from).then((answer) => ctx.reply(answer));
  })

};




module.exports = handler;

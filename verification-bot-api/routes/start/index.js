"use strict";





const handler = (ctx) => {

  global.session.get(ctx.sessionKey).then((session) => {

    if (!session.firstTime) {
      ctx.scene.enter('authorization');
      return;
    }

    delete session.firstTime;
    global.session.set(ctx.sessionKey, session);
    global.listAnswer.notExistUser(ctx.from).then((answer) => ctx.reply(answer));
  })

};




module.exports = handler;

"use strict";





const handler = (ctx) => {

  global.session.get(ctx.sessionKey).then((session) => {

    global.listAnswer.notExistUser(ctx.from)
    .then((answer) => ctx.reply(answer));
    
  })

};




module.exports = handler;

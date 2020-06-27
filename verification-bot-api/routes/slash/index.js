"use strict";




const handler = (ctx, next) => {

  global.session.get(ctx.sessionKey).then((session) => {

    if (Object.keys(session).length) {
      next();
      return;
    }

    global.handler.checkExistUser(ctx.from, (err, data) => {

      if (err) {
        ctx.reply("error stac trays");
        return;
      }
  
      if (data !== "notExist") {
        global.session.set(ctx.sessionKey, data).then(() => next());
        return;
      }
  
      global.handler.saveUser(ctx, next);
  
    });

  })

};




module.exports = handler;

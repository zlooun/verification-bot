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
  
      if (data === "notExist") {
        global.handler.saveUser(ctx, next);
        return;
      }
  
      if (data.isAuthenticated === false) {
        return;
      }

      global.session.set(ctx.sessionKey, data)
      .then(() => next());

    });

  })

};




module.exports = handler;

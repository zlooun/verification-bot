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
        //next();
        return;
      }
  
      global.handler.saveUser(ctx.from, (err, data) => {
  
        if (err) {
          console.log(err);
          return;
        }
  
        if (!data) {
          console.log("notExist");
          return;
        }
  
        next();
      });
  
    });

  })

};




module.exports = handler;

"use strict";




const handler = (ctx, next) => {

  if (ctx.session[ctx. from. id]) {
    next();
    return;
  }

  
  global.handler.checkExistUser(ctx.from, (err, data) => {

    if (err) {
      ctx.reply("error stac trays");
      return;
    }


    if (data !== "notExist") {
      ctx.session[ctx.from.id] = data;
      next();
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

};




module.exports = handler;

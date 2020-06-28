"use strict";




const handler = (ctx, next) => {

  global.session.get(ctx.sessionKey).then((session) => {

    if (Object.keys(session).length) {
      next();
      return;
    }
  
    const findObj = {
      idUserTelegram: ctx.from.id
    }

    global.mongoModels.User.findOne(findObj)
    .then((data) => {

      if (!data) {
        console.log("Ошибочка вышла.");
        return;
      }

      if (data.isAuthenticated === true) {
        global.session.set(ctx.sessionKey, data)
      .then(() => next());
      return;
      }
  
      next();

    }, (err) => console.log(err));

    
  })

};




module.exports = handler;

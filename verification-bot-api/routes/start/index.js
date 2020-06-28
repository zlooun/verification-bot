"use strict";





const handler = (ctx) => {

  const findObj = {
    idUserTelegram: ctx.from.id
  }

  global.mongoModels.User.findOne(findObj)
  .then((doc) => {

    if (!doc) {

      global.handler.saveUser(ctx);

      global.listAnswer.notExistUser(ctx.from)
      .then((answer) => ctx.reply(answer));
      
      return; 
    }

    global.listAnswer.existUser(ctx)
    .then((answer) => ctx.reply(answer));

  }, (err) => console.log(err));

};




module.exports = handler;

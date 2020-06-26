"use strict";




const handler = (ctx, from) => {

  const findObj = {
    "idUserTelegram": from.id
  };


  global.mongoModels.User.findOne(findObj, (err, doc) => {

    if (err) {
      console.log(err);
      return;
    }

    if (!doc) {
      console.log("notExist");
      return;
    }

    global.session.set(ctx.sessionKey, doc);
    //ctx.session[from.id] = doc;

  });

};




module.exports = handler;

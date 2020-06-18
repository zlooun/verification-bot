"use strict";




const handler = (from, callback) => {

  const findObj = {
    "idUserTelegram": from.id
  };


  global.mongoModels.User.findOne(findObj, (err, doc) => {

    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }

    if (!doc) {
      callback(null, "notExist");
      return;
    }

    callback(null, doc);

  });

};




module.exports = handler;

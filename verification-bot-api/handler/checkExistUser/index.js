"use strict";




const handler = (from, callback) => {

  const findObj = {
    "idUserTelegram": from. id
  };


  global. mongoModels. User. findOne (findObj, (err, doc) => {

    if (err) {
      console. log (err);
      callback (err, null);
      return undefined;
    }


    if (!doc) {
      callback (null, "notExist");
      return undefined;
    }


    callback (null, doc);
    return undefined;
  });


  return undefined;
};




module. exports = () => handler;

"use strict";




const handler = (ctx, from) => {

  const findObj = {
    "idUserTelegram": from. id
  };


  global. mongoModels. User. findOne (findObj, (err, doc) => {

    if (err) {
      console. log (err);
      return undefined;
    }


    if (!doc) {
      console. log ("notExist");
      return undefined;
    }


    ctx. session [from. id] = doc;
    return undefined;
  });


  return undefined;
};




module. exports = () => handler;

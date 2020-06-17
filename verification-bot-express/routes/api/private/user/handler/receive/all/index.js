"use strict";




const handler = (req, res, patternFilter) => {

  console.log("Поиск всех user'ов в бд.\n");
  global.mongoModels.User.find({}, (err, doc) => {

    if (err) {
      console. log (err);
      res. json (global. listStatus. notSuccess ());
      return undefined;
    }


    if (!doc.length) {
      console.log("Ни одного пользователя нет в бд.\n");
      res. json (global. listStatus. notExist ());
      return undefined;
    }


    res. json (global. listStatus. success (global.handler.filters.filterArrayOfObjBeforeSend(patternFilter, doc)));
    console.log("Пользователь найден и отправлен.\n");
    
    return undefined;
  });

  return undefined;

};




module. exports = () => handler;

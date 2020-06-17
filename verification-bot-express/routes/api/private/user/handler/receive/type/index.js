"use strict";




const handler = (req, res, patternFilter) => {

  const type = req.body.type;


  const findObj = {
    role: type,
  };


  console.log("Поиск некоторых user'ов в бд.\n");
  global.mongoModels.User.find(findObj, (err, doc) => {

    if (err) {
      console. log (err);
      res. json (global. listStatus. notSuccess ());
      return undefined;
    }


    if (!doc.length) {
      console.log("Ни одного пользователя нет в бд\n");
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

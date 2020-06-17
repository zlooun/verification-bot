"use strict";




const handler = (req, res, patternFilter) => {

  const idUser = req.user._id;
  

  console.log("Поиск current user в бд\n");
  global. mongoModels. User. findById (idUser, (err, doc) => {

    if (err) {
      console. log (err);
      res. json (global. listStatus. notSuccess ());
      return undefined;
    }


    if (!doc) {
      console.log("Пользователь не найден\n");
      res. json (global. listStatus. notExist ());
      return undefined;
    }

    res. json (global. listStatus. success (global.handler.filters.filterObjBeforeSend(patternFilter, doc.toObject())));
    console.log("Пользователь найден и отправлен\n");
    
    return undefined;
  });

  return undefined;

};




module. exports = () => handler;

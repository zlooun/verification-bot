"use strict";




const updateRedis = require("../handler").updateRedis;


const handler = (req, res, idUser) => {

  let count = req.body.count;

  if (!count){
    count = 1;
  }

  console.log("Поиск user в бд.\n");
  global.mongoModels.User.findById(idUser, (err, user) => {

    if (err) {
      console.log(err);
      res.json(global.listStatus.notSuccess());
      return undefined;
    }

    if (!user) {
      console.log("User'а не существует\n");
      res.json(global.listStatus.notExist(null, "User'а не существует"));
      return undefined;
    }

    if (!user.root) {
      console.log("Пользователь не имеет прав.\n");
      res.json(global.listStatus.notAccess());
      return;
    }


    updateRedis(req, res, count, "", idUser);

    return;
  });
};




module.exports = () => handler;
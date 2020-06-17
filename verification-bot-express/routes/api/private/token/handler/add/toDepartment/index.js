"use strict";




const updateRedis = require("../handler").updateRedis;


const handler = (req, res, idUser) => {

  const idDepartment = req.body.idDepartment;
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


    global.mongoModels.Department.findById(idDepartment, (err, department) => {

      if (err) {
        console.log(err);
        res.json(global.listStatus.notSuccess());
        return;
      }
  
      if(!department){
        console.log("Department нет в бд.\n");
        res.json(global.listStatus.notExist(null, "Department нет в бд"));
        return;
      }

      if (department.readOnly){
        console.log("Department доступен только для чтения.\n");
        return;
      }

      if (!user.root && department.idTeamLeader !== idUser) {
        console.log("Пользователь не имеет прав.\n");
        res.json(global.listStatus.notAccess());
        return;
      }


      updateRedis(req, res, count, idDepartment, idUser);
    });
    return;
  });
  return;
};




module.exports = () => handler;
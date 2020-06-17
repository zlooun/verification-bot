"use strict";




const hat = require("hat");


const rack = hat.rack(256);


const handler = (req, res, count, idDepartment, idUser) => {

  const token = rack();

  global.redis.hset(token, "counter", count, "idDepartment", idDepartment, "idUser", idUser, (err, status) => {
    
    if (err) {
      console.log(err);
      res.json(global.listStatus.notSuccess());
      return;
    }

    if (!status) {
      console.log("Token не добавился в redis.\n");
      res.json(global.listStatus.notExist(null, "Token не добавился в redis."));
      return;
    }

    console.log(`Token создан: ${status}.\n`);
    res.json(global.listStatus.success(token));

    redis.expire(token, 60*60*24);

    return; 
  });


  global.redis.get("links", (err, doc) => {

    if (err) {
      console.log(err);
      return;
    }

    if (!doc) {
      doc = "{}";
    }


    let updateObj = JSON.parse(doc);

    if (updateObj[idUser]) {

      updateObj[idUser].push(token);
    }

    if (!updateObj[idUser]) {

      updateObj[idUser] = [token];
    }


    updateObj = JSON.stringify(updateObj);

    global.redis.set("links", updateObj, (err, status) => {
    
      if (err) {
        console.log(err);
        return;
      }

      if (!status) {
        console.log("Token user не добавился redis.\n");
        return;
      }

      console.log(`ссылки юзеров обновились: ${status}.\n`);
      return; 
    });
    return;
  });
  return;
};




module.exports = () => handler;
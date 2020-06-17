"use strict";




const handler = (token, doc) => {

  console.log("Уменьшение/удаление токена.\n");
  global.redis.hgetall(token, (err, infoSingup) => {

    if (err) {
      console.log(err);

      return undefined;
    }

    if (infoSingup.idDepartment) {

      global.events.emit("addUserToQueueAfterSignup", infoSingup.idDepartment, doc._id.toString());
    }

  
    if (infoSingup.counter <= 1) {

      global.events.emit("removeToken", token, infoSingup.idUser);

      return undefined;
    }

    global.redis.hincrby(token, "counter", -1, (err) => {

      if(err) {

        console.log(err);

        return;
      }

      console.log("Токен уменьшен на 1\n");

      return undefined;
    });

    return;
  });

  return;
}




module.exports = (token, doc) => {

  return () => handler(token, doc);
};
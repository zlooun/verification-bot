"use strict";




const handler = (req, res) => {

  const idUser = req.user._id.toString();
  const token = req.body.token;


  console.log("Поиск user в бд.\n");
  global.mongoModels.User.findById(idUser, (err, user) => {

    if (err) {
      console.log(err);
      res.json(global.listStatus.notSuccess());
      return;
    }

    if (!user) {
      console.log("User'а не существует\n");
      res.json(global.listStatus.notExist(null, "User'а не существует"));
      return;
    }

    if (user.root) {
      redis.del(token, callBackForRedis(res));
      return;
    }

    global.redis.get("links", (err, userLinksJson) => {

      if (err) {
        console.log(err);
        res.json(global.listStatus.notSuccess());
        return;
      }
  
      if (!userLinksJson) {
        userLinksJson = "{}";
      } 
  
      let userLinks = JSON.parse(userLinksJson);
      let links = userLinks[idUser];
  
  
      if (!links) {
        console.log("О данном пользователе нет данных в redis.\n");
        res.json(global.listStatus.notExist(null, "О данном пользователе нет данных в redis."));
        return;
      }
  
      if (!links.includes(token)) {
        console.log("Пользователь не создавал данную ссылку.\n");
        res.json(global.listStatus.notExist(null, "Пользователь не создавал данную ссылку."));
        return;
      }


      redis.del(token, callBackForRedis(res));

      return;
    });
    return;
  });
  return;
};


function callBackForRedis(res) {

  return (err, doc) => {

    if (err) {
      console.log(err);
      res.json(global.listStatus.notSuccess());
      return;
    }

    if (!doc) {
      console.log("Token'a либо нет в redis, либо он не удалился.\n");
      res.json(global.listStatus.notUpdate());
      return;
    }

    console.log(`Token удалился из redis.\n`);
    res.json(global.listStatus.success());

    return;
  };
}





module.exports = () => handler;
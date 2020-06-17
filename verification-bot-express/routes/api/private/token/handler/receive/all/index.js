"use strict";




const handler = (req, res) => {

  const idUser = req.user._id.toString();


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
      console.log("Пользователь не имеет root прав");
      res.json(global.listStatus.notAccess());
      return undefined;
    }

    global.redis.get("links", async (err, userLinksJson) => {

      if (err) {
        console.log(err);
        res.json(global.listStatus.notSuccess());
        return;
      }
  
      if (!userLinksJson || userLinksJson === "{}") {
        console.log("Ни одного токена в redis.\n");
        res.json(global.listStatus.notExist(null, "Ни одного токена в redis."));
        return;
      } 

      let userLinks = JSON.parse(userLinksJson);
      let linksWithData = {};

      for (const idUser in userLinks) {

        for (const link of userLinks[idUser]) {
          const linksData = await global.redis.hgetall(link, (err, linksData) => {

            if (err) {
              console.log(err);
              return;
            }
  
            delete linksData.idUser;
  
            linksWithData[link] = linksData;
          });
  
          await global.redis.ttl(link, (err, timeLife) => {
  
            if (err) {  
              console.log(err);
              return;
            }
  
            linksData.timeLife = timeLife;
          })
        }
      }

      console.log("Все ссылки с данными отправлены.\n");
      res.json(global.listStatus.success(linksWithData));

      return;
    });
    return;
  });
  return;
}




module.exports = () => handler;
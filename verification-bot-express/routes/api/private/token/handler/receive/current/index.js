"use strict";


const handler = (req, res) => {

  const idUser = req.user._id.toString();


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

    global.redis.get("links", async (err, userLinksJson) => {
      if (err) {
        console.log(err);
        res.json(global.listStatus.notSuccess());
        return;
      }

      if (!userLinksJson) {
        userLinksJson = "{}";
      }

      const userLinks = JSON.parse(userLinksJson);
      const links = userLinks[idUser];

      if (!links) {
        console.log("О данном пользователе нет данных в redis.\n");
        res.json(global.listStatus.notExist(null, "О данном пользователе нет данных в redis."));
        return;
      }

      const linksWithData = {};

      for (const link of links) {
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
        });
      }

      console.log("Все ссылки с данными отправлены.\n");
      res.json(global.listStatus.success(linksWithData));

      return;
    });
    return;
  });
  return;
};


module.exports = () => handler;

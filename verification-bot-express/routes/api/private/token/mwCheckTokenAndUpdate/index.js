"use strict";




const handler = (req, res, next) => {


  global.redis.get("links", async (err, userLinksJson) => {

    if (err) {
      console.log(err);
      next();
      return;
    }

    if (!userLinksJson) {
      console.log("Нет ни одной ссылки в redis.\n");
      next();
      return;
    } 

    
    let userLinks = JSON.parse(userLinksJson);

    for (const idUser in userLinks) {

      if (!userLinks.hasOwnProperty(idUser)) {
        continue;
      }

      let links = userLinks[idUser];
      let length = links.length;

      for (let i = 0; i < length; i++) {

        const token = links[i];

        await global.redis.exists(token, (err, result) => {

          if (err) {
            console.log(err);
            next();
            return undefined;
          }

          if (!result){
            links.splice(i, 1);
            --length;
            --i;
          }
          return;
        });

        if (!links.length){
          delete userLinks[idUser];
        }
  
        if (links.length){
          userLinks[idUser] = links;
        }
      }
    }
    
    userLinks = JSON.stringify(userLinks);

    global.redis.set("links", userLinks, (err, status) => {
        
      if (err) {
        console.log(err);
        next();
        return;
      }

      if (!status) {
        console.log("links не обновились.\n");
        next();
        return;
      }

      console.log("Links юзеров обновились.\n");
      
      next();
      return;
    });
    return;
  });
  return;
};




module.exports = () => handler;
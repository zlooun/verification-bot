"use strict";




const Scene = require('telegraf/scenes/base');


const handler = () => {

  const authorization = new Scene('authorization');
  authorization.enter((ctx) => { 

    global.session.get(ctx.sessionKey)
    .then((session) => {

      if (Object.keys(session).length) {
        global.listAnswer.isAuthenticated()
        .then((str) => ctx.reply(str));
        ctx.scene.leave();
        return;
      }

      ctx.reply('Введи свой токен авторизации, чтобы я смог тебя опознать.');

    })

  });

  authorization.leave();
  authorization.hears(/Хватит/gi, (ctx) => {

    ctx.reply("Прощай(");
    ctx.scene.leave();
    
  }); 
  authorization.hears(/Пусти/gi, (ctx) => {

    ctx.reply("Ну ладно)");
    ctx.scene.leave();

    global.mongoModels.User.findOne({"idUserTelegram": ctx.from.id})
    .then(() => {

      global.mongoModels.User.findOneAndUpdate({ "idUserTelegram": ctx.from.id }, { "isAuthenticated": true, "notifications": true }, { new : true })
      .then((user) => {
        global.session.set(ctx.sessionKey, user);
        global.redis.exists("queue")
        .then((result) => global.redis.hset("queue", ctx.from.id, result ? false : true))
      });

    })
    
  });
  authorization.on('message', (ctx) => ctx.reply(`Я тебя не знаю:(
Попробуй еще раз, или введи "Хватит".`));

  return authorization;
};




module.exports = handler;

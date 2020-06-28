"use strict";




const Scene = require('telegraf/scenes/base');


const handler = () => {

  const turnOnNotifications = new Scene('turnOnNotifications');

  turnOnNotifications.enter((ctx) => {

    global.session.get(ctx.sessionKey)
    .then((session) => {

      if (!Object.keys(session).length) {
        global.listAnswer.notAuthenticated(ctx.from)
        .then((str) => ctx.reply(str));
        ctx.scene.leave();
        return;
      }

      global.redis.hexists("queue", ctx.from.id)
      .then((result) => {

        if (result) {
          ctx.reply("У вас уже включены уведомления.");
          ctx.scene.leave();
          return;
        }

        ctx.reply(`Вы уверены, что хотите включить уведмоления? (Введите "Да" или "Нет")`);

      })

    })

  });

  turnOnNotifications.hears(/Да/gi, (ctx) => {

    global.mongoModels.User.findOneAndUpdate({"idUserTelegram": ctx.from.id}, { "notifications": true }, { new : true })
    .then((user) => {

      if (!user) {
        console.log("notUpdated");
        ctx.reply("notUpdated");
        ctx.scene.leave();
        return;
      }

      global.session.set(ctx.sessionKey, user)
      .then(() => {

        global.redis.exists("queue")
        .then((result) => {

          global.redis.hset("queue", ctx.from.id, result ? false : true)
          .then((result) => {
  
            if (result) {
              console.log("Уведомления включены.");
              ctx.reply("Уведомления включены.");
              ctx.scene.leave();
              return;
            }
  
            console.log("Произошла какая-то ошибка.");
            ctx.reply("Произошла какая-то ошибка.");
            ctx.scene.leave();
  
          })

        })

      }, (err) => console.log(err));

    }, (err) => console.log(err))
    
  }); 
  turnOnNotifications.hears(/Нет/gi, (ctx) => {

    ctx.reply("Уведомления по-прежнему отключены.");
    ctx.scene.leave();
    
  });
  turnOnNotifications.on('message', (ctx) => ctx.reply(`Я вас не понимаю. Введите "Да" или "Нет".`));

  return turnOnNotifications;
};




module.exports = handler;

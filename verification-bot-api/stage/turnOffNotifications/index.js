"use strict";




const Scene = require('telegraf/scenes/base');


const handler = () => {

  const turnOffNotifications = new Scene('turnOffNotifications');

  turnOffNotifications.enter((ctx) => {

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

        if (!result) {
          ctx.reply("У вас уже отключены уведомления.");
          ctx.scene.leave();
          return;
        }

        ctx.reply(`Вы уверены, что хотите отключить уведмоления? (Введите "Да" или "Нет")`);

      })

    })

  });

  turnOffNotifications.hears(/Да/gi, (ctx) => {

    global.mongoModels.User.findOneAndUpdate({"idUserTelegram": ctx.from.id}, { "notifications": false }, { new : true })
    .then((user) => {

      if (!user) {
        console.log("notUpdated");
        ctx.reply("notUpdated");
        ctx.scene.leave();
        return;
      }

      global.session.set(ctx.sessionKey, user)
      .then(() => {

        global.redis.hget("queue", ctx.from.id)
        .then((turn) => {

          if (turn === "false") {

            console.log(123);

            global.redis.hdel("queue", ctx.from.id)
            .then((result) => {
    
              if (result) {
                console.log("Уведомления отключены.");
                ctx.reply("Уведомления отключены.");
                ctx.scene.leave();
                return;
              }
    
              console.log("Произошла какая-то ошибка.");
              ctx.reply("Произошла какая-то ошибка.");
              ctx.scene.leave();
    
            });

            return;
          }

          global.redis.hgetall("queue")
          .then((queue) => {
    
            queue = Object.entries(queue);

            for (let i = 0; i < queue.length; i++) {
              
              const turn = queue[i];
    
              if (turn[1] === "true") {
    
                global.redis.hdel("queue", ctx.from.id)
                .then((result) => {
        
                  if (result) {
                    console.log("Уведомления отключены.");
                    ctx.reply("Уведомления отключены.");
                    ctx.scene.leave();
                    return;
                  }
        
                  console.log("Произошла какая-то ошибка.");
                  ctx.reply("Произошла какая-то ошибка.");
                  ctx.scene.leave();
        
                });
    
                if (queue.length !== 1) {

                  if (i === queue.length - 1) {
                    global.redis.hset("queue", queue[0][0], true);
                    break;
                  }
      
                  global.redis.hset("queue", queue[i + 1][0], true);
                  break;

                }

                break;

              }
    
            }
    
          });

        }, (err) => console.log(err))

      });

    }, (err) => console.log(err));
    
  }); 

  turnOffNotifications.hears(/Нет/gi, (ctx) => {

    ctx.reply("Уведомления по-прежнему включены.");
    ctx.scene.leave();
    
  });
  turnOffNotifications.on('message', (ctx) => ctx.reply(`Я вас не понимаю. Введите "Да" или "Нет".`));

  return turnOffNotifications;
};




module.exports = handler;

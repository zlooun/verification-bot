"use strict";




const dirname = path.relative(process.cwd(), __dirname);


const handler = (ctx) => {
  
  return new Promise((resolve, reject) => {

    global.mongoModels.User.findOneAndUpdate({"idUserTelegram": ctx.from.id}, { "notifications": false }, { new : true })
    .then((user) => {

      if (!user) {
        winston.warn(`${log} - - Пользователь не обновился в бд.`);
        winston.info(`${log} - - Отправляем ответ пользователю.`);
        ctx.reply("Ошибка.", {reply_markup: {remove_keyboard: true}});
        winston.info(`${log} - - Покидаем сцену.`);
        ctx.scene.leave();
        return;
      }

      return global.session.set(ctx.sessionKey, user);
      
    }, (err) => winston.error(`${log} - - ${err}`));

  })

};




module.exports = handler;

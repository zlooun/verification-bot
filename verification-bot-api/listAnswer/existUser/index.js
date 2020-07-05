"use strict";




const dirname = path.relative(process.cwd(), __dirname);


const handler = (ctx) => {

  const log = `[BOT][${ctx.from.id}] - - [${dirname}]`;
  const from = ctx.from;

  return new Promise((resolve) => {


    global.session.get(ctx.sessionKey).then((session) => {

      if (!Object.keys(session).length) {
        const str = `Привет ${ from.first_name} ${ from.last_name }! Я тебя уже знаю, но ты не авторизовался. Введи /authorization, для того, чтобы это исправить.`;
        resolve({ str, isAuth: false });
        return;
      }

      const str = `Привет ${ from.first_name} ${ from.last_name }! Я тебя уже знаю, и ты авторизован. Введи /help, чтобы посмотреть, что ты можешь сделать.`;
      resolve({ str, isAuth: true });
    }, (err) => winston.error(`${log} - - ${err}`));

  })

};




module.exports = handler;

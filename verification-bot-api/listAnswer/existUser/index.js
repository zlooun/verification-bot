"use strict";




const handler = (ctx) => {

  const from = ctx.from;

  return new Promise((resolve) => {


    global.session.get(ctx.sessionKey).then((session) => {

      if (!Object.keys(session).length) {
        const str = `Привет ${ from.first_name} ${ from.last_name }! Я тебя уже знаю, но ты не авторизовался. Введи /authorization, для того, чтобы это исправить.`;
        resolve(str, false);
        return;
      }

      const str = `Привет ${ from.first_name} ${ from.last_name }! Я тебя уже знаю, и ты авторизован. Введи /help, чтобы посмотреть, что ты можешь сделать.`;
      resolve(str, true);
    }, (err) => console.log(err));

  })

};




module.exports = handler;

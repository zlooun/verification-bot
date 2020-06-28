"use strict";




const handler = (ctx) => {

  const from = ctx.from;

  return new Promise((resolve, reject) => {


    global.session.get(ctx.sessionKey).then((session) => {

      if (!Object.keys(session).length) {
        const str = `Привет ${ from.first_name} ${ from.last_name }! А мы с тобой уже знакомы. Но ты не авторизировался. Введи /authorization, для того, чтобы это исправить.`;
        resolve(str);
        return;
      }

      const str = `Привет ${ from.first_name} ${ from.last_name }! А мы с тобой уже знакомы. И ты авторизирован. Введи /help, чтобы посмотреть, что ты можешь сделать.`;
      resolve(str);
    }, (err) => console.log(err));

  })

};




module.exports = handler;

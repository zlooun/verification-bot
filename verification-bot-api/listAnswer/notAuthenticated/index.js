"use strict";




const handler = (from) => {

  return new Promise((resolve) => {

    const str = `Вы неавторизированы, чтобы авторизоваться введите /authorization.`;

    resolve(str)

  })

};




module.exports = handler;

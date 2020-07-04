"use strict";




const handler = () => {

  return new Promise((resolve) => {

    const str = `Ты не авторизован, чтобы авторизоваться введи /authorization, либо нажми на соответствующую кнопку.`;

    resolve(str)

  })

};




module.exports = handler;

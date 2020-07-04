"use strict";




const handler = () => {

  return new Promise((resolve) => {

    const str = `Ты уже авторизован.`;

    resolve(str)

  })

};




module.exports = handler;

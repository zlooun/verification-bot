"use strict";




const handler = () => {

  return new Promise((resolve) => {

    const str = `Вы уже авторизованы.`;

    resolve(str)

  })

};




module.exports = handler;

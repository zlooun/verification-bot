"use strict";




const handler = (from) => {

  return new Promise((resolve) => {

    const str = `Привет ${ from.first_name} ${ from.last_name }! Я бот уведомляющий о необходимости верифицировать клиента.
Для того, чтобы авторизоваться - введи команду /authorization, либо нажми на соответствующую кнопку.
Если ты не знаешь что я за бот - уходи.`;

    resolve(str);

  })

};




module.exports = handler;

"use strict";




const handler = (from) => {

  return new Promise((resolve) => {

    const str = `Привет ${ from.first_name} ${ from.last_name }! Я призван помочь людям и мне нужны данные твои.`;

    resolve(str)

  })

};




module.exports = handler;

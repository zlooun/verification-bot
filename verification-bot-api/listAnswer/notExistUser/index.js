"use strict";




const handler = (from, callback) => {

  const str = `Привет ${ from.first_name} ${ from.last_name }! Я призван помочь людям и мне нужны данные твои.`;

  callback (str);

};




module.exports = handler;

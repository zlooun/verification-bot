"use strict";




const handler = (from, callback) => {

  const str = `${ from.first_name } ${ from.last_name }, команды ниже помогут тебе лучше понять мою работу\n
  /help помощь\n
  /authorization авторизироваться`;


  callback(str);

};




module.exports = handler;

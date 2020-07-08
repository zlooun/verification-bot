"use strict";




const handler = (Markup) => {
  return Markup
  .keyboard(['🌚 Авторизоваться'])
  .resize()
  .extra();
};




module.exports = handler;

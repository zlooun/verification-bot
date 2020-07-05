"use strict";




const handler = (Markup) => {
  return Markup
  .keyboard(['⛔ Хватит'])
  .oneTime()
  .resize()
  .extra();
};




module.exports = handler;

"use strict";




const handler = (Markup) => {
  return Markup
  .keyboard(['⛔ Хватит'])
  .resize()
  .extra();
};




module.exports = handler;

"use strict";




const handler = (Markup) => {
  return Markup
  .keyboard(['✅ Да', '❌ Нет'])
  .resize()
  .extra();
};




module.exports = handler;

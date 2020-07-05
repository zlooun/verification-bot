"use strict";




const handler = (Markup) => {
  return Markup
  .keyboard(['✅ Да', '❌ Нет'])
  .oneTime()
  .resize()
  .extra();
};




module.exports = handler;

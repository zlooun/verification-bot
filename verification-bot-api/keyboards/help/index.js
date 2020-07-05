"use strict";




const handler = (Markup) => {
  return Markup
  .keyboard(['💡 Помощь'])
  .oneTime()
  .resize()
  .extra();
};




module.exports = handler;

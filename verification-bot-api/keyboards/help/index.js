"use strict";




const handler = (Markup) => {
  return Markup
  .keyboard(['💡 Помощь'])
  .resize()
  .extra();
};




module.exports = handler;

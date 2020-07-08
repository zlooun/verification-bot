"use strict";




const handler = (Markup) => {
  return Markup
  .keyboard([['👎 Выключить уведомления'],
             ['💡 Помощь']])
  .resize()
  .extra();
};




module.exports = handler;

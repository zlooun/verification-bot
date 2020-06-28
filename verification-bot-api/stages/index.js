"use strict";




const handler = (bot) => {

  bot.use(require("./main")());

};




module.exports = handler;
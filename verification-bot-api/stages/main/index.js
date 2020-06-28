"use strict";




const Stage = require('telegraf/stage');


const handler = () => {

  const main = new Stage();

  main.command('cancel', Stage.leave());
  main.register(require("./authorization")());
  main.register(require("./turnOffNotifications")());
  main.register(require("./turnOnNotifications")());

  return main;
};




module.exports = handler;

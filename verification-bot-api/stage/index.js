"use strict";




const Stage = require('telegraf/stage');


const handler = () => {

  const stage = new Stage();

  stage.command('cancel', Stage.leave());
  stage.register(require("./authorization")());
  stage.register(require("./turnOffNotifications")());
  stage.register(require("./turnOnNotifications")());

  return stage;

};




module.exports = handler;
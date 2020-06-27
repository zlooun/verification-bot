"use strict";




const Stage = require('telegraf/stage');
const { leave } = Stage;


const handler = () => {

  const main = new Stage();

  main.command('cancel', leave());
  main.register(require("./authorization")(leave));

  return main;
};




module.exports = handler;

"use strict";




const Markup = require('telegraf/markup');


const handler = () => {
  return {
    "enough": require("./enough")(Markup),
    "turnOff": require("./turnOff")(Markup),
    "turnOn": require("./turnOn")(Markup),
    "authorization": require("./authorization")(Markup),
    "help": require("./help")(Markup),
    "yesNo": require("./yesNo")(Markup),
  };
};




module.exports = handler;

"use strict";




const handler = () => {
  return {
    "slash": require("./slash"),
    "start": require("./start"),
    "help": require("./help"),
    "authorization": require("./authorization"),
    "turnOff": require("./turnOff"),
    "turnOn": require("./turnOn"),
  };
};




module.exports = handler;

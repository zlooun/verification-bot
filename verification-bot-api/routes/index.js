"use strict";




const handler = () => {
  return {
    "slash": require("./slash"),
    "start": require("./start"),
    "help": require("./help"),
    "authorization": require("./authorization"),
    "turnOff": require("./turnOff"),
    "turnOn": require("./turnOn"),
    "other": require("./other")
  };
};




module.exports = handler;

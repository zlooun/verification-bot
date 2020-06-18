"use strict";




const handler = () => {
  return {
    "slash": require("./slash"),
    "start": require("./start"),
    "help": require("./help"),
    "settings": require("./settings"),
    "info": require("./info"),
    "challenge": require("./challenge")
  };
};




module.exports = handler;

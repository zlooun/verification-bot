"use strict";




const handler = () => {
  return {
    "slash": require("./slash"),
    "start": require("./start"),
    "help": require("./help"),
  };
};




module.exports = handler;

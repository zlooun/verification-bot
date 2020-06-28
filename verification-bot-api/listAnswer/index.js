"use strict";




const handler = () => {
  return {
    "existUser": require("./existUser"),
    "notExistUser": require("./notExistUser"),
    "help": require("./help"),
    "settings": require("./settings"),
    "info": require("./info"),
    "challenge": require("./challenge"),
    "notAuthenticated": require("./notAuthenticated")
  };
};




module.exports = handler;

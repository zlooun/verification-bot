"use strict";




const handler = () => {
  return {
    "existUser": require("./existUser"),
    "notExistUser": require("./notExistUser"),
    "help": require("./help"),
    "notAuthenticated": require("./notAuthenticated"),
    "isAuthenticated": require("./isAuthenticated")
  };
};




module.exports = handler;

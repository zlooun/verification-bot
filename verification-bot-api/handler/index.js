"use strict";




const handler = () => {
  return {
    "checkExistUser": require("./checkExistUser"),
    "saveUser": require("./saveUser"),
    "saveUserInSession": require("./saveUserInSession")
  };
};




module.exports = handler;

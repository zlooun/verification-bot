"use strict";




const handler = () => {
  return {
    "checkExistUser": require("./checkExistUser"),
    "saveUser": require("./saveUser"),
    "saveUserInSession": require("./saveUserInSession"),
    "setAuthenticated": require("./setAuthenticated"),
    "updateUser": require("./updateUser")
  };
};




module.exports = handler;

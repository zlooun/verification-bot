"use strict";




const handler = () => {
  return {
    "saveUser": require("./saveUser"),
    "setAuthenticated": require("./setAuthenticated"),
    "updateUser": require("./updateUser"),
    "setIntervalForWinstonsConfigs": require("./setIntervalForWinstonsConfigs"),
  };
};




module.exports = handler;

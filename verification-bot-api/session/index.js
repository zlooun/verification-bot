"use strict";




const handler = () => {
  return {
    "del": require("./del"),
    "get": require("./get"),
    "set": require("./set"),
  };
};




module.exports = handler;
